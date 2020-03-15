use app::database::create_connection_pool;
use app::usecase as uc;
use chrono::prelude::Utc;
use deadpool_postgres::Pool;
use failure::Error;
use futures::future::join_all;
use serde_json::json;
use std::collections::HashMap;
use std::time::{Duration, Instant};
use uuid::Uuid;

#[tokio::main]
async fn main() {
    let pool = create_connection_pool().unwrap();
    let db = pool.get().await.unwrap();
    for _i in 0..100 {
        let now = Instant::now();
        let values: HashMap<String, f64> = vec![
            ("a0".to_owned(), 1.0),
            ("a1".to_owned(), 1.0),
            ("a2".to_owned(), 1.0),
            ("a3".to_owned(), 1.0),
            ("a4".to_owned(), 1.0),
        ]
        .into_iter()
        .collect();
        uc::add_scalars(&db, &values, &Utc::now()).await.unwrap();
        println!("{}", now.elapsed().as_millis());
    }
}
