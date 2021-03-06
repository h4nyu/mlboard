use crate::entities::*;
use crate::logics::reduce_points;
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
    async fn bulk_insert(&self, row: &[T]) -> Result<(), Error>;
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

pub struct RangeKey {
    pub id: Uuid,
    pub from_date: DateTime<Utc>,
    pub to_date: DateTime<Utc>,
}

pub trait Storage:
    Create<Trace>
    + Get<Trace, Key = NameKey>
    + Delete<Trace, Key = IdKey>
    + Contain<Trace, Key = NameKey>
    + BulkInsert<Point>
    + Filter<SlimPoint, Key = RangeKey>
    + Delete<Point, Key = IdKey>
    + Sync
{
}

#[async_trait]
pub trait SearchPoints: HasStorage {
    async fn search_points(
        &self,
        trace_id: &Uuid,
        from_date: &DateTime<Utc>,
        to_date: &DateTime<Utc>,
    ) -> Result<Vec<SlimPoint>, Error> {
        let points: Vec<SlimPoint> = self
            .storage()
            .filter(&RangeKey {
                id: trace_id.to_owned(),
                from_date: from_date.to_owned(),
                to_date: to_date.to_owned(),
            })
            .await?;
        Ok(reduce_points(&points, 1000))
    }
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
        let mut points: Vec<Point> = vec![];
        for (k, v) in values {
            let trace_id = self.create_trace(k).await?;
            let point = Point {
                trace_id: trace_id,
                ts: ts.to_owned(),
                value: v.to_owned(),
            };
            points.push(point);
        }
        self.storage().bulk_insert(&points).await?;
        Ok(())
    }
}

#[async_trait]
pub trait DeleteTrace: HasStorage {
    async fn delete_trace(&self, id: &Uuid) -> Result<(), Error> {
        Delete::<Trace>::delete(
            self.storage(),
            &IdKey {
                id: id.to_owned(),
            },
        )
        .await?;
        Delete::<Point>::delete(
            self.storage(),
            &IdKey {
                id: id.to_owned(),
            },
        )
        .await?;
        Ok(())
    }
}
