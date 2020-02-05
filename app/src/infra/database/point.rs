// use super::*;
//
// impl From<Row> for Point {
//     fn from(row: Row) -> Self {
//         Self {
//             value: row.get("value"),
//             trace_id: row.get("trace_id"),
//             ts: row.get("ts"),
//         }
//     }
// }
//
// impl From<Row> for SlimPoint {
//     fn from(row: Row) -> Self {
//         Self {
//             value: row.get("value"),
//             ts: row.get("ts"),
//         }
//     }
// }
//
// const TABLE_NAME: &'static str = "points";
//
// #[async_trait]
// impl PointRepository for Client {
//     async fn get_by_range(
//         &self,
//         trace_id: &Uuid,
//         from_date: &DateTime<Utc>,
//         to_date: &DateTime<Utc>,
//     ) -> Result<Vec<SlimPoint>, Error> {
//         let sql = format!(
//             "SELECT value, ts
//             FROM {}
//             WHERE trace_id = $1
//             AND ts BETWEEN $2 AND $3
//             ORDER BY ts ASC",
//             TABLE_NAME,
//         );
//         self.query(&sql, &[trace_id, from_date, to_date]).await
//     }
//     async fn delete(&self, trace_ids: &[&Uuid]) -> Result<(), Error> {
//         let sql = format!(
//             "DELETE FROM {} WHERE trace_id = ANY($1)",
//             TABLE_NAME
//         );
//         self.execute(&sql, &[&trace_ids]).await?;
//         Ok(())
//     }
// }
//
// #[cfg(test)]
// mod tests {
//     use super::*;
//
//     #[tokio::test]
//     async fn test_aaa() -> Result<(), Error>{
//         let repo = Postgresql::new().await?;
//         PointRepository::delete(&repo, &[&Uuid::new_v4()]).await?;
//         Ok(())
//     }
// }
