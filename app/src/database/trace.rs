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
        let table_name = format!("points_{}", &row.id.to_simple());
        self.simple_query(
            &format!("
            CREATE TABLE {table_name}
                (
                    ts timestamp with time zone NOT NULL DEFAULT clock_timestamp(),
                    value double precision
                );
            SELECT create_hypertable('{table_name}', 'ts', chunk_time_interval => interval '2 day');
            ", table_name=&table_name)[..],
        )
        .await?;

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
        self.simple_query(&format!("DROP TABLE points_{};", &key.id.to_simple())[..]).await?;
        self.execute("DELETE FROM traces WHERE id = $1;", &[&key.id]).await?;
        Ok(())
    }
}

#[async_trait]
impl Contain<Trace> for Client {
    type Key = NameKey;
    async fn contain(&self, key: &NameKey) -> Result<Vec<Trace>, Error> {
        let regex = format!("%{}%", &key.name);
        let res: Vec<Trace> = self
            .query("SELECT * FROM traces WHERE name LIKE $1 ORDER BY created_at DESC", &[&regex])
            .await?
            .into_iter()
            .map(|x| x.into())
            .collect();
        Ok(res)
    }
}


#[cfg(test)]
mod tests {
    use super::*;
    #[tokio::test]
    async fn test_create_trace() -> () {
        let mut row:Trace = Default::default();
        row.name = Uuid::new_v4().to_string();
        let pool = create_connection_pool().unwrap();
        let conn = pool.get().await.unwrap();
        conn.create(&row).await.unwrap();
        Delete::<Trace>::delete(&conn, &IdKey{id: row.id.to_owned()}).await.unwrap();
    }
}
