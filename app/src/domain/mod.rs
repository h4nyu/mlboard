use uuid::Uuid;
pub mod entities;
use crate::domain::entities::*;
use chrono::prelude::{DateTime, Utc};
use failure::Error;
use serde_json::Value;

pub trait GetAll<T> {
    fn get_all(&mut self) -> Result<Vec<T>, Error>;
}

pub trait BulkInsert<T>{
    fn bulk_insert(&mut self, rows: &[&T]) -> Result<usize, Error>;
}

pub trait Clear<T>{
    fn clear(&mut self) -> Result<(), Error>;
}


pub trait WorkspaceRepository: GetAll<Workspace> + BulkInsert<Workspace>
{
    fn get(&mut self, name: &str) -> Result<Vec<Workspace>, Error>;
    fn update(&mut self, id:&Uuid, name: &str, config: &Value) -> Result<Uuid, Error>;
    fn insert(&mut self, row: &Workspace) -> Result<Uuid, Error>;
    fn delete(&mut self, id: &Uuid) -> Result<Uuid, Error>;
}
pub trait TraceRepository: BulkInsert<Trace> + Clear<Trace> + GetAll<Trace>
{
    fn get(&mut self, name: &str, workspace_id:&Uuid) -> Result<Vec<Trace>, Error>;
    fn get_by_workspace_id(&mut self, workspace_id: &Uuid) -> Result<Vec<Trace>, Error>;
    fn insert(&mut self, row: &Trace) -> Result<Uuid, Error>;
    fn update_last_ts(&mut self, ids:&[&Uuid], updated_at:&DateTime<Utc>) -> Result<(), Error>;
    fn delete(&mut self, ids: &[&Uuid]) -> Result<(), Error>;
}

pub trait PointRepository:  BulkInsert<Point>{
    fn get_by_range(&mut self, id:&Uuid, from_date:&DateTime<Utc>, to_date:&DateTime<Utc>) -> Result<Vec<SlimPoint>, Error>;
    fn delete(&mut self, trace_ids: &[&Uuid]) -> Result<(), Error>;
}
