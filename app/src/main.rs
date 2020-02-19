use app::infra::web::run;

#[cfg_attr(tarpaulin, skip)]
#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    run().await
}
