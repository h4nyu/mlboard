use super::*;
use crate::usecase::TraceRepository;

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
impl TraceRepository for Client {
    async fn get_all(&self) -> Result<Vec<Trace>, Error> {
        let res = self
            .query("SELECT * FROM traces", &[])
            .await?
            .into_iter()
            .map(Trace::from)
            .collect();
        Ok(res)
    }
    async fn get(&self, name: &str, workspace_id: &Uuid) -> Result<Option<Trace>, Error> {
        let res = self
            .query_opt(
                "SELECT * FROM traces WHERE name = $1 AND workspace_id = $2",
                &[&name, workspace_id],
            )
            .await?
            .map(Trace::from);
        Ok(res)
    }
    async fn get_by_workspace_id(&self, workspace_id: &Uuid) -> Result<Vec<Trace>, Error> {
        let sql = "SELECT * FROM traces WHERE workspace_id = $1";
        let res = self
            .query(&sql[..], &[workspace_id])
            .await?
            .into_iter()
            .map(Trace::from)
            .collect();
        Ok(res)
    }

    async fn insert(&self, row: &Trace) -> Result<Uuid, Error> {
        let sql = "INSERT INTO traces (id, name, workspace_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)";
        self.execute(
            &sql[..],
            &[
                &row.id,
                &row.name,
                &row.workspace_id,
                &row.created_at,
                &row.updated_at,
            ],
        )
        .await?;
        Ok(row.id)
    }

    async fn update_last_ts(&self, ids: &[&Uuid], updated_at: &DateTime<Utc>) -> Result<(), Error> {
        let sql = "UPDATE traces SET updated_at = $1 WHERE id = ANY($2)";
        self.execute(&sql[..], &[updated_at, &ids]).await?;
        Ok(())
    }
    async fn delete(&self, ids: &[&Uuid]) -> Result<(), Error> {
        self.execute("DELETE FROM traces WHERE id = ANY($1)", &[&ids])
            .await?;
        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn test_get_all() -> Result<(), Error> {
        let pool = create_connection_pool()?;
        let client = pool.get().await?;
        TraceRepository::get_all(&client).await?;
        Ok(())
    }
}
