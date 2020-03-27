use super::*;

impl From<Row> for Point {
    fn from(row: Row) -> Self {
        Self {
            value: row.get("value"),
            trace_id: row.get("trace_id"),
            ts: row.get("ts"),
        }
    }
}

impl From<Row> for SlimPoint {
    fn from(row: Row) -> Self {
        Self {
            value: row.get("value"),
            ts: row.get("ts"),
        }
    }
}

#[async_trait]
impl Create<Point> for Client {
    async fn create(&self, row: &Point) -> Result<(), Error> {
        let table_name = format!("points_{}", row.trace_id.to_simple());
        self.execute(
            &format!("INSERT INTO {table_name} (ts, value) VALUES ($1, $2)", table_name=&table_name)[..],
            &[&row.ts, &row.value],
        )
        .await?;
        Ok(())
    }
}

#[async_trait]
impl Filter<SlimPoint> for Client {
    type Key = RangeKey;
    async fn filter(&self, key: &Self::Key) -> Result<Vec<SlimPoint>, Error> {
        let table_name = format!("points_{}", key.id.to_simple());
        let mut res: Vec<SlimPoint> = self
            .query(
                &format!("SELECT value, ts FROM {table_name} WHERE ts BETWEEN $1 AND $2", table_name=&table_name)[..],
                &[&key.from_date, &key.to_date],
            )
            .await?
            .into_iter()
            .map(SlimPoint::from)
            .collect();
        res.sort_by(|a, b| a.ts.cmp(&b.ts));
        Ok(res)
    }
}

#[async_trait]
impl BulkInsert<Point> for Client {
    async fn bulk_insert(&self, rows: &[Point]) -> Result<(), Error> {
        let values_stmt = rows
            .iter()
            .map(|x| format!("('{}',{},'{}')", x.ts, x.value, x.trace_id))
            .collect::<Vec<String>>()
            .join(",");
        let sql = format!(
            "INSERT INTO points (ts, value, trace_id) VALUES {}",
            values_stmt
        );
        self.execute(&sql[..], &[]).await?;
        Ok(())
    }
}
