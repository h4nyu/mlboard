use crate::domain::entities::{Point, Trace};
use crate::domain::usecase::PointService;
use crate::domain::Repository;
use actix_web::{get, web, App, HttpResponse, HttpServer};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
struct MyObj {
    name: String,
    number: i32,
}
fn index(item: web::Json<MyObj>) -> HttpResponse {
    HttpResponse::Ok().json(item.0) // <- send respons
}

pub async fn run() -> std::io::Result<()> {
    HttpServer::new(|| App::new().route("/", web::get().to(index)))
        .bind("0.0.0.0:5000")?
        .run()
        .await
}

#[cfg(test)]
mod tests {
    use super::*;
    use actix_web::dev::Service;
    use actix_web::{http, test};

    #[actix_rt::test]
    async fn test_index_ok() {
        let mut app =
            test::init_service(App::new().service(web::resource("/").route(web::post().to(index))))
                .await;

        let req = test::TestRequest::post()
            .uri("/")
            .set_json(&MyObj {
                name: "my-name".into(),
                number: 43,
            })
            .to_request();
        let resp = app.call(req).await.unwrap();

        assert_eq!(resp.status(), http::StatusCode::OK);

        let response_body = match resp.response().body().as_ref() {
            Some(actix_web::body::Body::Bytes(bytes)) => bytes,
            _ => panic!("Response error"),
        };

        assert_eq!(response_body, r##"{"name":"my-name","number":43}"##);
    }
}
