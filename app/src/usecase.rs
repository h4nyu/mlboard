use crate::domain::entities::*;
use crate::domain::*;
use chrono::prelude::{DateTime, Utc};
use failure::Error;
use serde_json::Value;
use std::collections::HashMap;
use uuid::Uuid;
//
pub async fn register_trace<R>(repo: &R, workspace_id: &Uuid, name: &str) -> Result<Uuid, Error>
where
    R: TraceRepository,
{
    let id = match repo.get(name, workspace_id).await? {
        Some(x) => x.id,
        None => {
            let new_trace = Trace::new(name, workspace_id);
            repo.insert(&new_trace).await?;
            new_trace.id
        }
    };
    Ok(id)
}

pub async fn register_workspace<R>(repo: &R, name: &str, params: &Value) -> Result<Uuid, Error>
where
    R: WorkspaceRepository,
{
    let id = match repo.get(name).await? {
        Some(x) => repo.update(&x.id, name, params).await?,
        None => {
            let new_workspace = Workspace::new(name, params);
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

pub async fn get_point_by_range<R>(
    repo: &R,
    trace_id: &Uuid,
    from_date: &DateTime<Utc>,
    to_date: &DateTime<Utc>,
) -> Result<Vec<SlimPoint>, Error>
where
    R: PointRepository,
{
    PointRepository::get_by_range(repo,trace_id, from_date, to_date).await
}

pub async fn add_scalars<R>(
    repo: &R,
    values: &HashMap<Uuid, f64>,
    ts: &DateTime<Utc>,
) -> Result<(), Error>
where
    R: PointRepository + TraceRepository,
{
    let mut points: Vec<Point> = vec![];
    let mut trace_ids: Vec<&Uuid> = vec![];

    for (k, v) in values.iter() {
        let mut p = Point::new();
        p.value = v.to_owned();
        p.trace_id = k.to_owned();
        points.push(p);
        trace_ids.push(k);
    }

    repo.bulk_insert(&points.iter().collect::<Vec<_>>()).await?;
    repo.update_last_ts(&trace_ids, ts).await?;
    Ok(())
}

pub async fn delete_workspace<R>(repo: &R, workspace_id: &Uuid) -> Result<Uuid, Error>
where
    R: PointRepository + TraceRepository + WorkspaceRepository,
{
    let traces = repo.get_by_workspace_id(workspace_id).await?;
    let trace_ids: Vec<&Uuid> = traces.iter().map(|x| &x.id).collect();
    PointRepository::delete(repo, &trace_ids).await?;
    TraceRepository::delete(repo, &trace_ids).await?;
    WorkspaceRepository::delete(repo, workspace_id).await?;
    Ok(workspace_id.to_owned())
}
