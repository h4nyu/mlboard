use crate::infra::database::Postgresql;
use crate::usecase as uc;
use actix_web::middleware::Logger;
use actix_web::{delete, error, get, post, web, App, HttpResponse, HttpServer};
use chrono::prelude::{DateTime, Utc};
use failure::Error;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use uuid::Uuid;
use serde_json::Value;
use env_logger;


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
struct PointRangeBy {
    trace_id: Uuid,
    from_date: DateTime<Utc>,
    to_date: DateTime<Utc>,
}

#[get("/point/range-by")]
fn get_point_by_range(payload: web::Query<PointRangeBy>) -> Result<HttpResponse, error::Error> {
    wrap(|repo| {
        uc::get_point_by_range(
            repo,
            &payload.trace_id,
            &payload.from_date,
            &payload.to_date,
        )
    })
}

#[get("/trace/all")]
fn get_trace_all() -> Result<HttpResponse, error::Error> {
    wrap(|repo| {
        let res = uc::get_trace_all(repo)?;
        Ok(res)
    })
}

#[get("/workspace/all")]
fn get_workspace_all() -> Result<HttpResponse, error::Error> {
    wrap(|repo| {
        let res = uc::get_workspace_all(repo)?;
        Ok(res)
    })
}



#[derive(Deserialize)]
struct RegisterWorkspace {
    name: String,
    params: Value,
}
#[post("/workspace/register")]
fn register_workspace(
    payload: web::Json<RegisterWorkspace>,
) -> Result<HttpResponse, error::Error> {
    wrap(|repo| {
        let res = uc::register_workspace(
            repo,
            &payload.name,
            &payload.params,
        )?;
        Ok(res)
    })
}

#[derive(Deserialize)]
struct RegisterTrace {
    name: String,
    workspace_id: Uuid,
}
#[post("/trace/register")]
fn register_trace(
    payload: web::Json<RegisterTrace>,
) -> Result<HttpResponse, error::Error> {
    wrap(|repo| {
        let res = uc::register_trace(
            repo,
            &payload.workspace_id,
            &payload.name,
        )?;
        Ok(res)
    })
}


#[derive(Deserialize)]
struct WorkspaceDelete {
    id: Uuid,
}

#[delete("/workspace")]
fn delete_workspace(payload: web::Query<WorkspaceDelete>) -> Result<HttpResponse, error::Error> {
    wrap(|repo| {
        let res = uc::delete_workspace(repo, &payload.id)?;
        Ok(res)
    })
}

#[derive(Deserialize)]
struct PointAddScalars {
    ts: Option<DateTime<Utc>>,
    values: HashMap<Uuid, f64>,
}
#[post("/point/add-scalars")]
fn add_scalars(payload: web::Json<PointAddScalars>) -> Result<HttpResponse, error::Error> {
    wrap(|repo| {
        let res = uc::add_scalars(
            repo, 
            &payload.values, 
            &payload.ts
        )?;
        Ok(res)
    })
}

pub fn run() -> std::io::Result<()> {
    std::env::set_var("RUST_LOG", "actix_web=info");
    env_logger::init();
    HttpServer::new(|| {
        App::new()
            .wrap(Logger::default())
            .wrap(Logger::new("%a %{User-Agent}i"))
            .service(get_point_by_range)
            .service(get_trace_all)
            .service(get_workspace_all)
            .service(register_workspace)
            .service(delete_workspace)
            .service(register_trace)
            .service(add_scalars)
    })
    .bind("0.0.0.0:5000")?
    .run()
}
