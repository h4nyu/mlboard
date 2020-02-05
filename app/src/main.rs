use app::infra::web::run;

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    run().await
}
