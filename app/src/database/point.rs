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
impl Delete<Point> for Client {
    type Key = IdKey;
    async fn delete(&self, key: &IdKey) -> Result<(), Error> {
        self.execute("DELETE FROM points WHERE trace_id = $1", &[&key.id])
            .await?;
        Ok(())
    }
}

#[async_trait]
impl Filter<SlimPoint> for Client {
    type Key = RangeKey;
    async fn filter(&self, key: &Self::Key) -> Result<Vec<SlimPoint>, Error> {
        let mut res: Vec<SlimPoint> = self
            .query(
                "SELECT value, ts FROM points WHERE trace_id = $1 AND ts BETWEEN $2 AND $3",
                &[&key.id, &key.from_date, &key.to_date],
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
