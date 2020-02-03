use super::*;
impl Table for Point {
    fn table_name() -> &'static str {
        "points"
    }
    fn from_row(row: &Row) -> Self {
        Self {
            value: row.get("value"),
            trace_id: row.get("trace_id"),
            ts: row.get("ts"),
        }
    }
}

impl Table for SlimPoint {
    fn table_name() -> &'static str {
        "points"
    }
    fn from_row(row: &Row) -> Self {
        Self {
            value: row.get("value"),
            ts: row.get("ts"),
        }
    }
}

impl PointRepository for Postgresql {
    fn get_by_range(
        &mut self,
        trace_id: &Uuid,
        from_date: &DateTime<Utc>,
        to_date: &DateTime<Utc>,
    ) -> Result<Vec<SlimPoint>, Error> {
        let sql = format!(
            "SELECT value, ts
            FROM {}
            WHERE trace_id = $1
            AND ts BETWEEN $2 AND $3
            ORDER BY ts ASC",
            Point::table_name(),
        );
        self.query(&sql, &[trace_id, from_date, to_date])
    }
    fn delete(&mut self, trace_ids: &[&Uuid]) -> Result<(), Error> {
        let sql = format!(
            "DELETE FROM {} WHERE trace_id = ANY($1)",
            Point::table_name(),
        );
        self.execute(&sql, &[&trace_ids])
    }
}
