use crate::entities::*;
use crate::error::ErrorKind;
use async_trait::async_trait;
use chrono::prelude::{DateTime, Utc};
use failure::Error;
use std::collections::HashMap;
use uuid::Uuid;

#[async_trait]
pub trait Filter<T> {
    type Key;
    async fn filter(&self, key: &Self::Key) -> Result<Vec<T>, Error>;
}

#[async_trait]
pub trait Contain<T> {
    type Key;
    async fn contain(&self, key: &Self::Key) -> Result<Vec<T>, Error>;
}

#[async_trait]
pub trait Get<T> {
    type Key;
    async fn get(&self, key: &Self::Key) -> Result<Option<T>, Error>;
}

#[async_trait]
pub trait Create<T> {
    async fn create(&self, row: &T) -> Result<(), Error>;
}

#[async_trait]
pub trait BulkInsert<T> {
    async fn bulk_insert(&self, row: &[&T]) -> Result<(), Error>;
}

#[async_trait]
pub trait Update<T> {
    async fn create(&self, row: &T) -> Result<(), Error>;
}

#[async_trait]
pub trait Delete<T> {
    type Key;
    async fn delete(&self, key: &Self::Key) -> Result<(), Error>;
}

#[async_trait]
pub trait TraceUsecase {
    async fn get_all(&self, keyword: &str) -> Result<Vec<Trace>, Error>;
    async fn add_scalars(&self, keyword: &str) -> Result<Vec<Trace>, Error>;
}

pub struct NameKey {
    pub name: String,
}

pub struct IdKey {
    pub id: Uuid,
}

pub trait Storage:
    Create<Trace>
    + Create<Point>
    + Get<Trace, Key = NameKey>
    + Delete<Trace, Key = IdKey>
    + Delete<Point, Key = IdKey>
    + Contain<Trace, Key = NameKey>
    + Sync
{
}

#[async_trait]
pub trait SearchTraces: HasStorage {
    async fn search_traces(&self, keyword: &str) -> Result<Vec<Trace>, Error> {
        let name = keyword.trim();
        let traces: Vec<Trace> = self
            .storage()
            .contain(&NameKey {
                name: name.to_owned(),
            })
            .await?;
        Ok(traces)
    }
}

#[async_trait]
pub trait CreateTrace: HasStorage {
    async fn create_trace(&self, name: &str) -> Result<Uuid, Error> {
        let id = match self
            .storage()
            .get(&NameKey {
                name: name.to_owned(),
            })
            .await?
        {
            Some(x) => x.id,
            None => {
                let mut new_row: Trace = Default::default();
                new_row.name = name.to_owned();
                self.storage().create(&new_row).await?;
                new_row.id
            }
        };
        Ok(id)
    }
}

pub trait HasStorage {
    fn storage(&self) -> &(dyn Storage);
}

#[async_trait]
pub trait AddScalars: CreateTrace {
    async fn add_scalars(
        &self,
        values: &HashMap<String, f64>,
        ts: &DateTime<Utc>,
    ) -> Result<(), Error> {
        for (k, v) in values {
            let trace_id = self.create_trace(k).await?;
            let point = Point {
                trace_id: trace_id,
                ts: ts.to_owned(),
                value: v.to_owned(),
            };
            self.storage().create(&point).await?;
        }
        Ok(())
    }
}

#[async_trait]
pub trait DeleteTrace: HasStorage {
    async fn delete_trace(&self, name: &str) -> Result<(), Error> {
        let trace_id = self
            .storage()
            .get(&NameKey {
                name: name.to_owned(),
            })
            .await?
            .ok_or(ErrorKind::TraceNotFound)?
            .id;
        Delete::<Trace>::delete(
            self.storage(),
            &IdKey {
                id: trace_id.to_owned(),
            },
        )
        .await?;
        Delete::<Point>::delete(
            self.storage(),
            &IdKey {
                id: trace_id.to_owned(),
            },
        )
        .await?;

        Ok(())
    }
}
