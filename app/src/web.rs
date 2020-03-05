use crate::database::create_connection_pool;
use crate::usecase::*;
use actix_files as fs;
use actix_web::middleware::Logger;
use actix_web::{error, web, App, HttpResponse, HttpServer};
use deadpool_postgres::{Client, Pool};
use env_logger;
use failure::Error;
use serde::Serialize;
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
            .service(fs::Files::new("/ui", "./static").index_file("index.html"))
            .service(
                web::resource("/api/trace/all").route(web::get().to(get_service::<GetTraceAll>)),
            )
            .service(
                web::resource("/api/trace/register")
                    .route(web::post().to(post_service::<CreateTrace>)),
            )
            .service(
                web::resource("/api/workspace")
                    .route(web::delete().to(get_service::<DeleteWorkspace>)),
            )
            .service(
                web::resource("/api/workspace/all")
                    .route(web::get().to(get_service::<GetWorkspaceAll>)),
            )
            .service(
                web::resource("/api/workspace/register")
                    .route(web::post().to(post_service::<CreateWorkspace>)),
            )
            .service(
                web::resource("/api/point/range-by").route(web::get().to(get_service::<GetPoints>)),
            )
            .service(
                web::resource("/api/point/add-scalars")
                    .route(web::post().to(post_service::<AddScalars>)),
            )
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
async fn post_service<T>(
    payload: web::Json<T>,
    db_pool: web::Data<Pool>,
) -> Result<HttpResponse, error::Error>
where
    T: Service<Client>,
{
    wrap(async {
        let client = db_pool.get().await?;
        payload.call(&client).await
    })
    .await
}

async fn get_service<T>(
    payload: web::Query<T>,
    db_pool: web::Data<Pool>,
) -> Result<HttpResponse, error::Error>
where
    T: Service<Client>,
{
    wrap(async {
        let client = db_pool.get().await?;
        payload.call(&client).await
    })
    .await
}
