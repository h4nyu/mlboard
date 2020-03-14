use crate::entities::*;
use crate::logics::reduce_points;
use async_trait::async_trait;
use chrono::prelude::{DateTime, Utc};
use failure::Error;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use std::collections::HashMap;
use uuid::Uuid;

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

pub trait IContext {
    fn point_repo(&self) -> &(dyn PointRepository + Sync);
    fn trace_repo(&self) -> &(dyn TraceRepository + Sync);
    fn workspace_repo(&self) -> &(dyn WorkspaceRepository + Sync);
}

#[async_trait]
pub trait Service<T> {
    type Output: Serialize;
    async fn call(&self, dependencies: &T) -> Result<Self::Output, Error>;
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateTrace {
    pub name: String,
    pub workspace_id: Uuid,
}

#[async_trait]
impl<T> Service<T> for CreateTrace
where
    T: IContext + Sync,
{
    type Output = Uuid;
    async fn call(&self, ctx: &T) -> Result<Self::Output, Error> {
        let trace_id = match ctx.trace_repo().get(&self.name, &self.workspace_id).await? {
            Some(x) => x.id,
            None => {
                let mut trace: Trace = Default::default();
                trace.name = self.name.to_owned();
                trace.workspace_id = self.workspace_id.to_owned();
                ctx.trace_repo().insert(&trace).await?;
                trace.id
            }
        };
        Ok(trace_id)
    }
}
//
#[derive(Deserialize, Serialize)]
pub struct CreateWorkspace {
    pub name: String,
    pub params: Value,
}

#[async_trait]
impl<T> Service<T> for CreateWorkspace
where
    T: IContext + Sync,
{
    type Output = Uuid;
    async fn call(&self, ctx: &T) -> Result<Self::Output, Error> {
        let id = match ctx.workspace_repo().get(&self.name).await? {
            Some(x) => {
                ctx.workspace_repo()
                    .update(&x.id, &self.name, &self.params)
                    .await?
            }
            None => {
                let new_workspace = Workspace::new(&self.name, &self.params);
                ctx.workspace_repo().insert(&new_workspace).await?
            }
        };
        Ok(id)
    }
}
//
//
#[derive(Deserialize, Serialize)]
pub struct GetTraceAll {}
#[async_trait]
impl<T> Service<T> for GetTraceAll
where
    T: IContext + Sync,
{
    type Output = Vec<Trace>;
    async fn call(&self, ctx: &T) -> Result<Self::Output, Error> {
        ctx.trace_repo().get_all().await
    }
}
//
#[derive(Deserialize, Serialize)]
pub struct GetWorkspaceAll {}
#[async_trait]
impl<T> Service<T> for GetWorkspaceAll
where
    T: IContext + Sync,
{
    type Output = Vec<Workspace>;
    async fn call(&self, ctx: &T) -> Result<Self::Output, Error> {
        ctx.workspace_repo().get_all().await
    }
}

#[derive(Deserialize, Serialize)]
pub struct GetPoints {
    pub trace_id: Uuid,
    pub from_date: DateTime<Utc>,
    pub to_date: DateTime<Utc>,
}
#[async_trait]
impl<T> Service<T> for GetPoints
where
    T: IContext + Sync,
{
    type Output = Vec<SlimPoint>;
    async fn call(&self, ctx: &T) -> Result<Self::Output, Error> {
        let points = ctx
            .point_repo()
            .get_by_range(&self.trace_id, &self.from_date, &self.to_date)
            .await?;
        Ok(reduce_points(&points, 1000))
    }
}
//
#[derive(Deserialize, Serialize)]
pub struct AddScalars {
    pub ts: DateTime<Utc>,
    pub values: HashMap<Uuid, f64>,
}
//
#[async_trait]
impl<T> Service<T> for AddScalars
where
    T: IContext + Sync,
{
    type Output = ();
    async fn call(&self, ctx: &T) -> Result<Self::Output, Error> {
        let mut points: Vec<Point> = vec![];
        let mut trace_ids: Vec<&Uuid> = vec![];

        for (k, v) in self.values.iter() {
            let mut p = Point::new();
            p.value = v.to_owned();
            p.trace_id = k.to_owned();
            p.ts = self.ts.to_owned();
            points.push(p);
            trace_ids.push(k);
        }
        ctx.point_repo()
            .bulk_insert(&points.iter().collect::<Vec<_>>())
            .await?;
        ctx.trace_repo()
            .update_last_ts(&trace_ids, &self.ts)
            .await?;
        Ok(())
    }
}

#[derive(Serialize, Deserialize)]
pub struct DeleteWorkspace {
    id: Uuid,
}

#[async_trait]
impl<T> Service<T> for DeleteWorkspace
where
    T: IContext + Sync,
{
    type Output = Uuid;
    async fn call(&self, ctx: &T) -> Result<Self::Output, Error> {
        let traces = ctx.trace_repo().get_by_workspace_id(&self.id).await?;
        let trace_ids: Vec<Uuid> = traces.iter().map(|x| x.id).collect();
        DeleteTrace {
            trace_ids: trace_ids,
        }
        .call(ctx)
        .await?;
        ctx.workspace_repo().delete(&self.id).await?;
        Ok(self.id)
    }
}

#[derive(Serialize, Deserialize)]
pub struct DeleteTrace {
    trace_ids: Vec<Uuid>,
}
#[async_trait]
impl<T> Service<T> for DeleteTrace
where
    T: IContext + Sync,
{
    type Output = ();
    async fn call(&self, ctx: &T) -> Result<Self::Output, Error> {
        ctx.point_repo()
            .delete(&self.trace_ids.iter().collect::<Vec<_>>())
            .await?;
        ctx.trace_repo()
            .delete(&self.trace_ids.iter().collect::<Vec<_>>())
            .await?;
        Ok(())
    }
}
