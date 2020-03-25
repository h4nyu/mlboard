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

// #[async_trait]
// impl TraceRepository for Client {
//     async fn get_all(&self) -> Result<Vec<Trace>, Error> {
//         let res = self
//             .query("SELECT * FROM traces", &[])
//             .await?
//             .into_iter()
//             .map(Trace::from)
//             .collect();
//         Ok(res)
//     }
//     async fn get(&self, name: &str) -> Result<Option<Trace>, Error> {
//         let res = self
//             .query_opt(
//                 "SELECT * FROM traces WHERE name = $1",
//                 &[&name],
//             )
//             .await?
//             .map(Trace::from);
//         Ok(res)
//     }
//
//     async fn insert(&self, row: &Trace) -> Result<Uuid, Error> {
//         let sql = "INSERT INTO traces (id, name, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)";
//         self.execute(
//             &sql[..],
//             &[
//                 &row.id,
//                 &row.name,
//                 &row.created_at,
//                 &row.updated_at,
//             ],
//         )
//         .await?;
//         Ok(row.id)
//     }
//
//     async fn update_last_ts(&self, ids: &[&Uuid], updated_at: &DateTime<Utc>) -> Result<(), Error> {
//         let sql = "UPDATE traces SET updated_at = $1 WHERE id = ANY($2)";
//         self.execute(&sql[..], &[updated_at, &ids]).await?;
//         Ok(())
//     }
//     async fn delete(&self, ids: &[&Uuid]) -> Result<(), Error> {
//         self.execute("DELETE FROM traces WHERE id = ANY($1)", &[&ids])
//             .await?;
//         Ok(())
//     }
// }
//
// #[cfg(test)]
// mod tests {
//     use super::*;
//
//     #[tokio::test]
//     async fn test_get_all() -> Result<(), Error> {
//         let pool = create_connection_pool()?;
//         let client = pool.get().await?;
//         TraceRepository::get_all(&client).await?;
//         Ok(())
//     }
// }
