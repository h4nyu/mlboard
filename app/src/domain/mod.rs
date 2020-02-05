use uuid::Uuid;
pub mod entities;
use crate::domain::entities::*;
use chrono::prelude::{DateTime, Utc};
use failure::Error;
use serde_json::Value;
use async_trait::async_trait;


pub trait GetAll<T> {
    fn get_all(&self) -> Result<Vec<T>, Error>;
}

pub trait BulkInsert<T> {
    fn bulk_insert(&self, rows: &[&T]) -> Result<usize, Error>;
}

pub trait Clear<T> {
    fn clear(&self) -> Result<(), Error>;
}

pub trait WorkspaceRepository: GetAll<Workspace> + BulkInsert<Workspace> {
    fn get(&self, name: &str) -> Result<Vec<Workspace>, Error>;
    fn update(&self, id: &Uuid, name: &str, config: &Value) -> Result<Uuid, Error>;
    fn insert(&self, row: &Workspace) -> Result<Uuid, Error>;
    fn delete(&self, id: &Uuid) -> Result<Uuid, Error>;
}

#[async_trait]
pub trait TraceRepository: {
    async fn get_all(&self) -> Result<Vec<Trace>, Error>;
    // fn get(&self, name: &str, workspace_id: &Uuid) -> Result<Vec<Trace>, Error>;
    // fn get_by_workspace_id(&self, workspace_id: &Uuid) -> Result<Vec<Trace>, Error>;
    // fn insert(&self, row: &Trace) -> Result<Uuid, Error>;
    // fn update_last_ts(&self, ids: &[&Uuid], updated_at: &DateTime<Utc>) -> Result<(), Error>;
    // fn delete(&self, ids: &[&Uuid]) -> Result<(), Error>;
}


#[async_trait]
pub trait PointRepository {
    async fn get_by_range(
        &self,
        id: &Uuid,
        from_date: &DateTime<Utc>,
        to_date: &DateTime<Utc>,
    ) -> Result<Vec<SlimPoint>, Error>;
    async fn delete(
        &self, 
        trace_ids: &[&Uuid]
    ) -> Result<(), Error>;
}
