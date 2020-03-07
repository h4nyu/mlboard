use super::*;
use crate::usecase::WorkspaceRepository;
use serde_json::Value;

impl From<Row> for Workspace {
    fn from(row: Row) -> Self {
        Self {
            id: row.get("id"),
            name: row.get("name"),
            params: row.get("params"),
            created_at: row.get("created_at"),
        }
    }
}

pub trait FilterBy<T, U> {
    fn filter(&mut self) -> Result<Vec<U>, Error>;
}

#[async_trait]
impl WorkspaceRepository for Client {
    async fn get_all(&self) -> Result<Vec<Workspace>, Error> {
        let res = self
            .query("SELECT * FROM workspaces", &[])
            .await?
            .into_iter()
            .map(Workspace::from)
            .collect();
        Ok(res)
    }
    async fn get(&self, name: &str) -> Result<Option<Workspace>, Error> {
        let res = self
            .query_opt("SELECT * FROM workspaces WHERE name = $1", &[&name])
            .await?
            .map(Workspace::from);
        Ok(res)
    }
    async fn insert(&self, row: &Workspace) -> Result<Uuid, Error> {
        self.execute(
            "INSERT INTO workspaces (id, name, params, created_at) VALUES ($1, $2, $3, $4)",
            &[&row.id, &row.name, &row.params, &row.created_at],
        )
        .await?;
        Ok(row.id)
    }
    async fn update(&self, id: &Uuid, name: &str, params: &Value) -> Result<Uuid, Error> {
        self.execute(
            "UPDATE workspaces SET name = $1, params = $2 WHERE id = $3",
            &[&name, params, id],
        )
        .await?;
        Ok(id.to_owned())
    }
    async fn delete(&self, id: &Uuid) -> Result<Uuid, Error> {
        self.execute("DELETE FROM workspaces WHERE id = $1", &[id])
            .await?;
        Ok(id.to_owned())
    }
}
