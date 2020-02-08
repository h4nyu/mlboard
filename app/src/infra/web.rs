use crate::usecase as uc;
use actix_web::middleware::Logger;
use crate::infra::database::{create_connection_pool};
use actix_web::{error,web, App, HttpResponse, HttpServer};
use chrono::prelude::{DateTime, Utc};
use failure::Error;
use serde::{Deserialize, Serialize};
use deadpool_postgres::{ Pool};
use std::collections::HashMap;
use uuid::Uuid;
use serde_json::Value;
use env_logger;
use std::future::Future;


pub async fn run() -> std::io::Result<()> {
    std::env::set_var("RUST_LOG", "actix_web=info");
    env_logger::init();

    HttpServer::new(|| {
        let pool = create_connection_pool().unwrap();
        App::new()
            .data(pool)
            .wrap(Logger::default())
            .wrap(Logger::new("%a %{User-Agent}i"))
            .service(web::resource("/trace/all").route(web::get().to(get_trace_all)))
            .service(web::resource("/trace/register").route(web::post().to(register_trace)))
            .service(web::resource("/workspace").route(web::delete().to(delete_workspace)))
            .service(web::resource("/workspace/all").route(web::get().to(get_workspace_all)))
            .service(web::resource("/workspace/register").route(web::post().to(register_workspace)))
            .service(web::resource("/point/range-by").route(web::get().to(get_point_by_range)))
            .service(web::resource("/point/add-scalars").route(web::post().to(add_scalars)))
    })
    .bind("0.0.0.0:5000")?
    .run()
    .await
}
//
//
pub async fn wrap<O, T>(ft: O) -> Result<HttpResponse, error::Error>
where O: Future<Output=Result<T, Error>>,
      T: Serialize

{
    match ft.await {
        Ok(x) => Ok(HttpResponse::Ok().json(x)),
        Err(e) => Err(error::ErrorInternalServerError(e)),
    }
}
//
#[derive(Deserialize)]
struct PointRangeBy {
    trace_id: Uuid,
    from_date: DateTime<Utc>,
    to_date: DateTime<Utc>,
}

async fn get_point_by_range(
    payload: web::Query<PointRangeBy>,
    db_pool: web::Data<Pool>,
) -> Result<HttpResponse, error::Error> {
    wrap(async {
        let client = db_pool.get().await?;
        uc::get_point_by_range(
            &client,
            &payload.trace_id,
            &payload.from_date,
            &payload.to_date,
        ).await
    }).await
}

async fn get_trace_all(
    db_pool: web::Data<Pool>,
) -> Result<HttpResponse, error::Error> {
    wrap(async {
        let client = db_pool.get().await?;
        uc::get_trace_all(&client).await
    }).await
}
//
async fn get_workspace_all(
    db_pool: web::Data<Pool>,
    ) -> Result<HttpResponse, error::Error> {
    wrap(async {
        let repo = db_pool.get().await?;
        uc::get_workspace_all(&repo).await
        
    }).await
}



#[derive(Deserialize)]
struct RegisterWorkspace {
    name: String,
    params: Value,
}
async fn register_workspace(
    payload: web::Json<RegisterWorkspace>,
    db_pool: web::Data<Pool>,
) -> Result<HttpResponse, error::Error> {
    wrap(async {
        let repo = db_pool.get().await?;
        uc::register_workspace(
            &repo,
            &payload.name,
            &payload.params,
        ).await
    }).await
}

#[derive(Deserialize)]
struct RegisterTrace {
    name: String,
    workspace_id: Uuid,
}
async fn register_trace(
    payload: web::Json<RegisterTrace>,
    db_pool: web::Data<Pool>,
) -> Result<HttpResponse, error::Error> {
    wrap(async {
        let repo = db_pool.get().await?;
        uc::register_trace(
            &repo,
            &payload.workspace_id,
            &payload.name,
        ).await
    }).await
}


#[derive(Deserialize)]
struct WorkspaceDelete {
    id: Uuid,
}
async fn delete_workspace(
    payload: web::Query<WorkspaceDelete>,
    db_pool: web::Data<Pool>,
    ) -> Result<HttpResponse, error::Error> {
    wrap(async {
        let repo = db_pool.get().await?;
        uc::delete_workspace(&repo, &payload.id).await
    }).await
}
//
#[derive(Deserialize)]
struct PointAddScalars {
    ts: DateTime<Utc>,
    values: HashMap<Uuid, f64>,
}
async fn add_scalars(
    payload: web::Json<PointAddScalars>,
    db_pool: web::Data<Pool>,
) -> Result<HttpResponse, error::Error> {
    wrap(async {
        let repo = db_pool.get().await?;
        uc::add_scalars(
            &repo,
            &payload.values,
            &payload.ts
        ).await
    }).await
}
