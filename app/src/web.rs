use crate::database::create_connection_pool;
use crate::usecase::*;
use crate::usecase as uc;
use actix_files as fs;
use actix_web::middleware::Logger;
use actix_web::{error, web, App, HttpResponse, HttpServer};
use deadpool_postgres::{Pool, Client};
use env_logger;
use failure::Error;
use serde::{Deserialize, Serialize};
use std::future::Future;
use std::convert::From;

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
            .service(fs::Files::new("/ui", "./static").index_file("index.html"))
            .service(web::resource("/api/trace/all").route(web::get().to(get_trace_all)))
            .service(web::resource("/api/trace/register").route(web::post().to(create_trace)))
            .service(web::resource("/api/workspace").route(web::delete().to(delete_workspace)))
            .service(web::resource("/api/workspace/all").route(web::get().to(get_workspace_all)))
            .service(web::resource("/api/workspace/register").route(web::post().to(register_workspace)))
            .service(web::resource("/api/point/range-by").route(web::get().to(get_point_by_range)))
            .service(web::resource("/api/point/add-scalars").route(web::post().to(add_scalars)))
    })
    .bind("0.0.0.0:5000")?
    .run()
    .await
}
impl <'a> From<Client> for Context<'a>{
    fn from(value: Client) -> Self{
        Self {
            workspace_repo: &value,
            trace_repo: &value,
        }
    }
}

pub async fn wrap<O, T>(ft: O) -> Result<HttpResponse, error::Error>
where
    O: Future<Output = Result<T, Error>>,
    T: Serialize,
{
    match ft.await { Ok(x) => Ok(HttpResponse::Ok().json(x)),
        Err(e) => Err(error::ErrorInternalServerError(e)),
    }
}

async fn get_point_by_range(
    payload: web::Query<uc::GetPointRangeBy>,
    db_pool: web::Data<Pool>,
) -> Result<HttpResponse, error::Error> {
    wrap(async {
        let client = db_pool.get().await?;
        uc::get_point_by_range(&client, &payload).await
    })
    .await
}

async fn get_trace_all(db_pool: web::Data<Pool>) -> Result<HttpResponse, error::Error> {
    wrap(async {
        let client = db_pool.get().await?;
        uc::get_trace_all(&client).await
    })
    .await
}
//
async fn get_workspace_all(db_pool: web::Data<Pool>) -> Result<HttpResponse, error::Error> {
    wrap(async {
        let repo = db_pool.get().await?;
        uc::get_workspace_all(&repo).await
    })
    .await
}

async fn register_workspace(
    payload: web::Json<uc::RegisterWorkspace>,
    db_pool: web::Data<Pool>,
) -> Result<HttpResponse, error::Error> {
    wrap(async {
        let repo = db_pool.get().await?;
        uc::register_workspace(&repo, &payload).await
    })
    .await
}

async fn create_trace(
    payload: web::Json<CreateTraceMsg>,
    db_pool: web::Data<Pool>,
) -> Result<HttpResponse, error::Error> {
    wrap(async {
        let repo = db_pool.get().await?;
        let ctx = Context {
            trace_repo: &repo,
            workspace_repo: &repo,
        };
        ctx.create_trace(&payload).await
    })
    .await
}

async fn delete_workspace(
    payload: web::Query<uc::DeleteWorkspace>,
    db_pool: web::Data<Pool>,
) -> Result<HttpResponse, error::Error> {
    wrap(async {
        let repo = db_pool.get().await?;
        uc::delete_workspace(&repo, &payload).await
    })
    .await
}
//
async fn add_scalars(
    payload: web::Json<uc::AddScalars>,
    db_pool: web::Data<Pool>,
) -> Result<HttpResponse, error::Error> {
    wrap(async {
        let repo = db_pool.get().await?;
        uc::add_scalars(&repo, &payload).await
    })
    .await
}
