use super::*;
use crate::usecase::PointRepository;

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
impl PointRepository for Client {
    async fn get_by_range(
        &self,
        trace_id: &Uuid,
        from_date: &DateTime<Utc>,
        to_date: &DateTime<Utc>,
    ) -> Result<Vec<SlimPoint>, Error> {
        let mut res: Vec<SlimPoint> = self
            .query(
                "SELECT value, ts FROM points WHERE trace_id = $1 AND ts BETWEEN $2 AND $3",
                &[trace_id, from_date, to_date],
            )
            .await?
            .into_iter()
            .map(SlimPoint::from)
            .collect();
        res.sort_by(|a, b| a.ts.cmp(&b.ts));

        Ok(res)
    }
    async fn bulk_insert(&self, rows: &[&Point]) -> Result<usize, Error> {
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
        Ok(rows.len())
    }

    async fn delete(&self, trace_ids: &[&Uuid]) -> Result<(), Error> {
        self.execute("DELETE FROM points WHERE trace_id = ANY($1)", &[&trace_ids])
            .await?;
        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn test_build_insert() -> Result<(), Error> {
        let pool = create_connection_pool()?;
        let client = pool.get().await?;
        PointRepository::bulk_insert(&client, &[&Point::new(), &Point::new()]).await?;
        Ok(())
    }
}
