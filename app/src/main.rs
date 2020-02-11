use app::infra::web::run;
use failure::Error;

#[actix_rt::main]
async fn main() -> Result<(), Error> {
    run().await
}
