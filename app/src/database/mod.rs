mod point;
mod trace;

use uuid::Uuid;
use crate::entities::*;
use crate::usecase::*;
use async_trait::async_trait;
use deadpool_postgres::{Client, Config, Pool};
use failure::Error;
use tokio_postgres::{NoTls, Row};

pub fn create_connection_pool() -> Result<Pool, Error> {
    let mut cfg = Config::default();
    cfg.host = Some("db".into());
    cfg.dbname = Some("mlboard".into());
    cfg.user = Some("mlboard".into());
    cfg.password = Some("mlboard".into());
    let pool = cfg.create_pool(NoTls)?;
    Ok(pool)
}

#[async_trait]
impl Storage for Client {}
