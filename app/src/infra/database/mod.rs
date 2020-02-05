mod point;
mod trace;
// mod workspace;
use crate::domain::entities::*;
use crate::domain::*;
use chrono::prelude::{DateTime, Utc};
use failure::Error;
use tokio_postgres::{NoTls, connect, Row, types::ToSql};
use tokio;
// use serde::Serialize;
use uuid::Uuid;
use async_trait::async_trait;
use deadpool_postgres::{Client, Pool};

#[async_trait]
pub trait Query {
    async fn query<T>(&self, sql: &str, args: &[&(dyn ToSql + Sync)]) -> Result<Vec<T>, Error>;
}

// #[async_trait]
// impl Query for Client
// {
//     async fn query(&self, sql: &str, args: &[&(dyn ToSql + Sync)]) -> Result<Vec<T>, Error>
//         where T: From<Row>
//     {
//         let res = self
//             .query(&sql[..], args)
//             .await?
//             .into_iter()
//             .map(T::from)
//             .collect();
//         Ok(res)
//     }
// }
