use crate::database::create_connection_pool;
use crate::usecase::*;
use actix_files as fs;
use actix_web::middleware::Logger;
use actix_web::{error, web, App, HttpResponse, HttpServer};
use async_trait::async_trait;
use chrono::prelude::{DateTime, Utc};
use deadpool_postgres::{Client, Pool};
use env_logger;
use failure::Error;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::future::Future;

pub async fn run() -> std::io::Result<()> {
    std::env::set_var("RUST_LOG", "actix_web=info");
    env_logger::init();
    HttpServer::new(|| {
        let pool = create_connection_pool().unwrap();
        App::new()
            .data(web::JsonConfig::default().limit(4096000))
            .data(pool)
            .wrap(Logger::default())
            .wrap(Logger::new("%a %{User-Agent}i"))
            .service(fs::Files::new("/ui", "/public").index_file("index.html"))
            .service(web::resource("/api/v1/add_scalars").route(web::post().to(add_scalars)))
            .service(web::resource("/api/v1/traces").route(web::post().to(search_traces)))
            .service(web::resource("/api/v1/traces").route(web::delete().to(delete_trace)))
    })
    .bind("0.0.0.0:5000")?
    .run()
    .await
}
async fn wrap<O, T>(ft: O) -> Result<HttpResponse, error::Error>
where
    O: Future<Output = Result<T, Error>>,
    T: Serialize,
{
    match ft.await {
        Ok(x) => Ok(HttpResponse::Ok().json(x)),
        Err(e) => Err(error::ErrorInternalServerError(e)),
    }
}

// ---------------context------------
pub struct Context {
    pub storage: Client,
}
#[async_trait]
impl HasStorage for Context {
    fn storage(&self) -> &(dyn Storage) {
        &self.storage
    }
}
impl CreateTrace for Context {}
impl AddScalars for Context {}
impl SearchTraces for Context {}
impl DeleteTrace for Context {}
// ---------------context------------

#[derive(Deserialize)]
pub struct AddScalarsPayload {
    values: HashMap<String, f64>,
    ts: DateTime<Utc>,
}
async fn add_scalars(
    payload: web::Json<AddScalarsPayload>,
    db_pool: web::Data<Pool>,
) -> Result<HttpResponse, error::Error> {
    wrap(async {
        let db = db_pool.get().await?;
        let ctx = Context { storage: db };
        ctx.add_scalars(&payload.values, &payload.ts).await
    })
    .await
}

#[derive(Deserialize)]
pub struct SearchTracePayload {
    keyword: String,
}
async fn search_traces(
    payload: web::Json<SearchTracePayload>,
    db_pool: web::Data<Pool>,
) -> Result<HttpResponse, error::Error> {
    wrap(async {
        let db = db_pool.get().await?;
        let ctx = Context { storage: db };
        ctx.search_traces(&payload.keyword).await
    })
    .await
}

#[derive(Deserialize)]
pub struct DeleteTracePayload {
    name: String,
}
async fn delete_trace(
    payload: web::Json<DeleteTracePayload>,
    db_pool: web::Data<Pool>,
) -> Result<HttpResponse, error::Error> {
    wrap(async {
        let db = db_pool.get().await?;
        let ctx = Context { storage: db };
        ctx.delete_trace(&payload.name).await
    })
    .await
}
