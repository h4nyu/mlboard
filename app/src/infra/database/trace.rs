use super::*;

const TABLE_NAME: &'static str = "traces";
impl From<Row> for Trace {
    fn from(row: Row) -> Self {
        Self {
            id: row.get("id"),
            name: row.get("name"),
            workspace_id: row.get("workspace_id"),
            created_at: row.get("created_at"),
            updated_at: row.get("updated_at"),
        }
    }
}

#[async_trait]
impl TraceRepository for Client 
where Self: Query
{
    async fn get_all(&self) -> Result<Vec<Trace>, Error>{
        self.query(&format!("SELECT * FROM {}", TABLE_NAME), &[]).await
    }
    // fn get(&mut self, name: &str, workspace_id: &Uuid) -> Result<Vec<Trace>, Error> {
    //     let sql = format!(
    //         "SELECT * FROM {} WHERE name = $1 AND workspace_id = $2",
    //         Trace::table_name(),
    //     );
    //     self.query(&sql, &[&name, workspace_id])
    // }
    // fn get_by_workspace_id(&mut self, workspace_id: &Uuid) -> Result<Vec<Trace>, Error> {
    //     let sql = format!(
    //         "SELECT * FROM {} WHERE workspace_id = $1",
    //         Trace::table_name(),
    //     );
    //     self.query(&sql, &[workspace_id])
    // }
    //
    // fn insert(&mut self, row: &Trace) -> Result<Uuid, Error> {
    //     let sql = format!(
    //         "INSERT INTO {} (id, name, workspace_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)",
    //         Trace::table_name()
    //     );
    //     self.execute(
    //         &sql,
    //         &[
    //             &row.id,
    //             &row.name,
    //             &row.workspace_id,
    //             &row.created_at,
    //             &row.updated_at,
    //         ],
    //     )?;
    //     Ok(row.id)
    // }
    //
    // fn update_last_ts(&mut self, ids: &[&Uuid], updated_at: &DateTime<Utc>) -> Result<(), Error> {
    //     let sql = format!(
    //         "UPDATE {}
    //         SET updated_at = $1
    //         WHERE id = ANY($2)",
    //         Trace::table_name(),
    //     );
    //     self.execute(&sql, &[updated_at, &ids])
    // }
    // fn delete(&mut self, ids: &[&Uuid]) -> Result<(), Error> {
    //     let sql = format!("DELETE FROM {} WHERE id = ANY($1)", Trace::table_name(),);
    //     self.execute(&sql, &[&ids])
    // }
}
