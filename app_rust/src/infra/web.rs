use crate::domain::entities::{Point, Trace};
use crate::domain::usecase::PointService;
use crate::domain::Repository;
use actix_web::{get, web, App, HttpResponse, HttpServer};

async fn index() -> HttpResponse {
    HttpResponse::Ok()
        .content_type("plain/text")
        .header("X-Hdr", "sample")
        .body("data")
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
    use actix_web::{http, test};

    #[actix_rt::test]
    async fn test_index_ok() {
        let req = test::TestRequest::with_header("content-type", "text/plain").to_http_request();

        let resp = index().await;
        println!("{:?}", resp);
        assert_eq!(resp.status(), http::StatusCode::OK);
    }
}
