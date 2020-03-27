use super::*;

impl From<Row> for Trace {
    fn from(row: Row) -> Self {
        Self {
            id: row.get("id"),
            name: row.get("name"),
            created_at: row.get("created_at"),
            updated_at: row.get("updated_at"),
        }
    }
}

#[async_trait]
impl Create<Trace> for Client {
    async fn create(&self, row: &Trace) -> Result<(), Error> {
        self.execute(
            "INSERT INTO traces (id, name, created_at, updated_at) VALUES ($1, $2, $3, $4)",
            &[&row.id, &row.name, &row.created_at, &row.updated_at],
        )
        .await?;
        Ok(())
    }
}

#[async_trait]
impl Get<Trace> for Client {
    type Key = NameKey;
    async fn get(&self, key: &NameKey) -> Result<Option<Trace>, Error> {
        let res = self
            .query_opt("SELECT * FROM traces WHERE name = $1", &[&key.name])
            .await?
            .map(|x| x.into());
        Ok(res)
    }
}

#[async_trait]
impl Delete<Trace> for Client {
    type Key = IdKey;
    async fn delete(&self, key: &IdKey) -> Result<(), Error> {
        self.execute("DELETE FROM traces WHERE id = $1", &[&key.id])
            .await?;
        Ok(())
    }
}

#[async_trait]
impl Contain<Trace> for Client {
    type Key = NameKey;
    async fn contain(&self, key: &NameKey) -> Result<Vec<Trace>, Error> {
        let regex = format!("%{}%", &key.name);
        let res: Vec<Trace> = self
            .query("SELECT * FROM traces WHERE name LIKE $1", &[&regex])
            .await?
            .into_iter()
            .map(|x| x.into())
            .collect();
        Ok(res)
    }
}
