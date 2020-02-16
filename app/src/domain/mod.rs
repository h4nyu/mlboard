use uuid::Uuid;
pub mod entities;
use crate::domain::entities::*;
use async_trait::async_trait;
use chrono::prelude::{DateTime, Utc};
use failure::Error;
use serde_json::Value;



#[async_trait]
pub trait WorkspaceRepository {
    async fn get_all(&self) -> Result<Vec<Workspace>, Error>;
    async fn get(&self, name: &str) -> Result<Option<Workspace>, Error>;
    async fn update(&self, id: &Uuid, name: &str, config: &Value) -> Result<Uuid, Error>;
    async fn insert(&self, row: &Workspace) -> Result<Uuid, Error>;
    async fn delete(&self, id: &Uuid) -> Result<Uuid, Error>;
}

#[async_trait]
pub trait TraceRepository {
    async fn get_all(&self) -> Result<Vec<Trace>, Error>;
    async fn get(&self, name: &str, workspace_id: &Uuid) -> Result<Option<Trace>, Error>;
    async fn get_by_workspace_id(&self, workspace_id: &Uuid) -> Result<Vec<Trace>, Error>;
    async fn insert(&self, row: &Trace) -> Result<Uuid, Error>;
    async fn update_last_ts(&self, ids: &[&Uuid], updated_at: &DateTime<Utc>) -> Result<(), Error>;
    async fn delete(&self, ids: &[&Uuid]) -> Result<(), Error>;
}

#[async_trait]
pub trait PointRepository {
    async fn get_by_range(
        &self,
        trace_id: &Uuid,
        from_date: &DateTime<Utc>,
        to_date: &DateTime<Utc>,
    ) -> Result<Vec<SlimPoint>, Error>;
    async fn bulk_insert(&self, rows: &[&Point]) -> Result<usize, Error>;
    async fn delete(&self, trace_ids: &[&Uuid]) -> Result<(), Error>;
}
