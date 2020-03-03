use crate::entities::*;
use crate::logics::reduce_points;
use failure::Error;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use std::collections::HashMap;
use uuid::Uuid;
use async_trait::async_trait;
use chrono::prelude::{DateTime, Utc};

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

// --------------------------------------
pub struct Context<'a> {
    pub trace_repo: &'a (dyn TraceRepository + Sync),
    pub workspace_repo: &'a (dyn WorkspaceRepository + Sync),
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateTraceMsg {
    pub name: String,
    pub workspace_id: Uuid,
}
#[async_trait]
pub trait CreateTrace {
    async fn create_trace(&self, msg: &CreateTraceMsg) -> Result<Uuid, Error>;
}
#[async_trait]
impl <'a> CreateTrace for Context<'a>{
    async fn create_trace(&self, msg: &CreateTraceMsg) -> Result<Uuid, Error>{
        let trace_id = match self.trace_repo.get(&msg.name, &msg.workspace_id).await? {
            Some(x) => x.id,
            None => {
                let mut trace:Trace = Default::default();
                trace.name = msg.name.to_owned();
                trace.workspace_id = msg.workspace_id.to_owned();
                self.trace_repo.insert(&trace).await?;
                trace.id
            }
        };
        Ok(trace_id)
    }
}

#[derive(Deserialize, Serialize)]
pub struct RegisterWorkspace {
    pub name: String,
    pub params: Value,
}

pub async fn register_workspace<R>(repo: &R, msg: &RegisterWorkspace) -> Result<Uuid, Error>
where
    R: WorkspaceRepository,
{
    let id = match repo.get(&msg.name).await? {
        Some(x) => repo.update(&x.id, &msg.name, &msg.params).await?,
        None => {
            let new_workspace = Workspace::new(&msg.name, &msg.params);
            repo.insert(&new_workspace).await?
        }
    };

    Ok(id)
}

pub async fn get_trace_all<R>(repo: &R) -> Result<Vec<Trace>, Error>
where
    R: TraceRepository,
{
    TraceRepository::get_all(repo).await
}

pub async fn get_workspace_all<R>(repo: &R) -> Result<Vec<Workspace>, Error>
where
    R: WorkspaceRepository,
{
    repo.get_all().await
}

#[derive(Deserialize, Serialize)]
pub struct GetPointRangeBy {
    pub trace_id: Uuid,
    pub from_date: DateTime<Utc>,
    pub to_date: DateTime<Utc>,
}

pub async fn get_point_by_range<R>(repo: &R, msg: &GetPointRangeBy) -> Result<Vec<SlimPoint>, Error>
where
    R: PointRepository,
{
    let points =
        PointRepository::get_by_range(repo, &msg.trace_id, &msg.from_date, &msg.to_date).await?;
    Ok(reduce_points(&points, 1000))
}

#[derive(Deserialize, Serialize)]
pub struct AddScalars {
    pub ts: DateTime<Utc>,
    pub values: HashMap<Uuid, f64>,
}

pub async fn add_scalars<R>(repo: &R, msg: &AddScalars) -> Result<(), Error>
where
    R: PointRepository + TraceRepository,
{
    let mut points: Vec<Point> = vec![];
    let mut trace_ids: Vec<&Uuid> = vec![];

    for (k, v) in msg.values.iter() {
        let mut p = Point::new();
        p.value = v.to_owned();
        p.trace_id = k.to_owned();
        p.ts = msg.ts.to_owned();
        points.push(p);
        trace_ids.push(k);
    }

    repo.bulk_insert(&points.iter().collect::<Vec<_>>()).await?;
    repo.update_last_ts(&trace_ids, &msg.ts).await?;
    Ok(())
}

#[derive(Deserialize)]
pub struct DeleteWorkspace {
    id: Uuid,
}
pub async fn delete_workspace<R>(repo: &R, msg: &DeleteWorkspace) -> Result<Uuid, Error>
where
    R: PointRepository + TraceRepository + WorkspaceRepository,
{
    let traces = repo.get_by_workspace_id(&msg.id).await?;
    let trace_ids: Vec<&Uuid> = traces.iter().map(|x| &x.id).collect();
    PointRepository::delete(repo, &trace_ids).await?;
    TraceRepository::delete(repo, &trace_ids).await?;
    WorkspaceRepository::delete(repo, &msg.id).await?;
    Ok(msg.id)
}

#[cfg(test)]
mod tests {
    use super::*;
}
