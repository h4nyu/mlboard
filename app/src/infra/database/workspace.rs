use super::*;
use serde_json::Value;

impl Table for Workspace {
    fn table_name() -> &'static str {
        "workspaces"
    }
    fn from_row(row: &Row) -> Self {
        Self {
            id: row.get("id"),
            name: row.get("name"),
            params: row.get("params"),
            created_at: row.get("created_at"),
        }
    }
}
impl WorkspaceRepository for Postgresql {
    fn get(&mut self, name: &str) -> Result<Vec<Workspace>, Error>{
        let sql = format!("SELECT * FROM {} WHERE name = $1", Workspace::table_name());
        self.query(
            &sql,
            &[&name]
        )
    }
    fn insert(&mut self, row: &Workspace) -> Result<Uuid, Error> {
        let sql = format!(
            "INSERT INTO {} (id, name, params, created_at) VALUES ($1, $2, $3, $4)", 
            Workspace::table_name()
        );
        self.execute(
            &sql,
            &[
            &row.id, 
            &row.name,
            &row.params,
            &row.created_at,
            ]
        )?;
        Ok(row.id)
    }
    fn update(&mut self, id:&Uuid, name: &str, params:&Value) -> Result<Uuid, Error>{
        let sql = format!("UPDATE {} SET name = $1, params = $2 WHERE id = $3", 
            Workspace::table_name()
        );
        self.execute(
            &sql,
            &[&name, params, id]
        )?;
        Ok(id.to_owned())
    }
    fn delete(&mut self, id:&Uuid) -> Result<Uuid, Error>{
        let sql = format!("DELETE FROM {} WHERE id = $1", 
            Workspace::table_name()
        );
        self.execute(
            &sql,
            &[id]
        )?;
        Ok(id.to_owned())
    }
}
