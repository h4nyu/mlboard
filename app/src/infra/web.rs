use crate::usecase::*;
use crate::infra::database::Postgresql;
use actix_web::middleware::Logger;
use actix_web::{error, get, post, delete, web, App, HttpResponse, HttpServer};
use chrono::prelude::{DateTime, Utc};
use failure::Error;
use serde::{Deserialize, Serialize};
use uuid::Uuid;
use std::collections::HashMap;

pub fn wrap<T, O>(f: O) -> Result<HttpResponse, error::Error>
where
    O: Fn(&mut Postgresql) -> Result<T, Error>,
    T: Serialize,
{
    let mut repo = Postgresql::new()?;
    match f(&mut repo) {
        Ok(x) => Ok(HttpResponse::Ok().json(x)),
        Err(e) => Err(error::ErrorInternalServerError(e)),
    }
}

#[derive(Deserialize)]
struct PointRangeBy{
    trace_id: Uuid,
    from_date: DateTime<Utc>,
    to_date: DateTime<Utc>,
}

#[get("/point/range-by")]
fn point_range_by(
    payload: web::Query<PointRangeBy>,
) -> Result<HttpResponse, error::Error> {
    wrap(|repo| {
        get_point_by_range(
            repo, 
            &payload.trace_id,
            &payload.from_date,
            &payload.to_date,
        )
    })
}

#[get("/trace/all")]
fn trace_all() -> Result<HttpResponse, error::Error> {
    wrap(|repo| {
       let res = get_trace_all(repo)?;
       Ok(res)
    })
}

#[get("/workspace/all")]
fn workspace_all() -> Result<HttpResponse, error::Error> {
    wrap(|repo| {
       let res = get_workspace_all(repo)?;
       Ok(res)
    })
}


#[derive(Deserialize)]
struct WorkspaceDelete{
    id: Uuid
}

#[delete("/workspace")]
fn workspace_delete(
    payload: web::Query<WorkspaceDelete>
) -> Result<HttpResponse, error::Error> {
    wrap(|repo| {
       let res = delete_workspace(repo, &payload.id)?;
       Ok(res)
    })
}




#[derive(Deserialize)]
struct PointAddScalars{
    ts: DateTime<Utc>,
    values: HashMap<Uuid,f64>
}
#[post("/point/add-scalars")]
fn point_add_scalars(
    payload: web::Json<PointAddScalars>,
) -> Result<HttpResponse, error::Error> {
    wrap(|repo| {
       let res = add_scalars(
           repo, 
           &payload.values, 
           &payload.ts
       )?;
       Ok(res)
    })
}

pub fn run() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .wrap(Logger::default())
            .service(point_range_by)
            .service(trace_all)
            .service(workspace_all)
            .service(workspace_delete)
    })
    .bind("0.0.0.0:5000")?
    .run()
}

