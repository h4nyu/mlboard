use crate::entities::*;
use crate::error::ErrorKind;
use async_trait::async_trait;
use chrono::prelude::{DateTime, Utc};
use failure::Error;
use futures::future::join_all;
use std::collections::HashMap;
use uuid::Uuid;

#[async_trait]
pub trait Filter<T> {
    type Key;
    async fn filter(&self, key: &Self::Key) -> Result<Vec<T>, Error>;
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
pub trait UserUsecase {
    async fn search_traces(&self, keyword: &str) -> Result<Vec<Trace>, Error>;
    async fn add_scalars(&self, keyword: &str) -> Result<Vec<Trace>, Error>;
}

pub struct NameKey {
    pub name: String,
}

pub struct IdKey {
    pub id: Uuid,
}

pub async fn search_traces<T>(db: &T, name: &str) -> Result<Vec<Trace>, Error>
where
    T: Filter<Trace, Key = NameKey>,
{
    let traces: Vec<Trace> = db
        .filter(&NameKey {
            name: name.to_owned(),
        })
        .await?;
    Ok(traces)
}

pub async fn add_scalar<T>(db: &T, name: &str, value: &f64, ts: &DateTime<Utc>) -> Result<(), Error>
where
    T: Get<Trace, Key = NameKey> + Create<Trace> + Create<Point>,
{
    let trace_id = create_trace(db, name).await?;
    let point = Point {
        trace_id: trace_id,
        ts: ts.to_owned(),
        value: value.to_owned(),
    };
    db.create(&point).await?;
    Ok(())
}

pub async fn add_scalars<T>(
    db: &T,
    values: &HashMap<String, f64>,
    ts: &DateTime<Utc>,
) -> Result<(), Error>
where
    T: Get<Trace, Key = NameKey> + Create<Trace> + Create<Point>,
{
    let futs = values
        .iter()
        .map(|(k, v)| add_scalar(db, k, v, ts))
        .collect::<Vec<_>>();
    let res = join_all(futs).await;
    for r in res {
        r?;
    }
    Ok(())
}

pub async fn delete_trace<T>(db: &T, name: &str) -> Result<(), Error>
where
    T: Delete<Trace, Key = IdKey> + Delete<Point, Key = IdKey> + Get<Trace, Key = NameKey>,
{
    let trace_id = db
        .get(&NameKey {
            name: name.to_owned(),
        })
        .await?
        .ok_or(ErrorKind::TraceNotFound)?
        .id;
    Delete::<Trace>::delete(
        db,
        &IdKey {
            id: trace_id.to_owned(),
        },
    )
    .await?;
    Delete::<Point>::delete(
        db,
        &IdKey {
            id: trace_id.to_owned(),
        },
    )
    .await?;
    Ok(())
}

//------------ internals ----------------
async fn create_trace<T>(db: &T, name: &str) -> Result<Uuid, Error>
where
    T: Get<Trace, Key = NameKey> + Create<Trace>,
{
    let trace_id = match db
        .get(&NameKey {
            name: name.to_owned(),
        })
        .await?
    {
        Some(x) => x.id,
        None => {
            let mut new_row: Trace = Default::default();
            new_row.name = name.to_owned();
            db.create(&new_row).await?;
            new_row.id
        }
    };
    Ok(trace_id)
}
