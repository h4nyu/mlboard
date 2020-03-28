use app::database::create_connection_pool;
use app::usecase::*;
use app::web::Context;

use chrono::prelude::Utc;
use std::collections::HashMap;
use std::time::{Instant};

#[tokio::main]
async fn main() {
    let pool = create_connection_pool().unwrap();
    let db = pool.get().await.unwrap();
    let ctx = Context { storage: db };
    for _i in 0..100 {
        let now = Instant::now();
        let values: HashMap<String, f64> = vec![
            ("trace0".to_owned(), 1.0),
            ("trace1".to_owned(), 2.0),
            ("trace2".to_owned(), 3.0),
            ("trace3".to_owned(), 4.0),
            ("trace4".to_owned(), 5.0),
        ]
        .into_iter()
        .collect();
        ctx.add_scalars(&values, &Utc::now()).await.unwrap();
        println!("{}", now.elapsed().as_millis());
    }
}
