use app::infra::database::create_connection_pool;
use app::usecase::*;
use chrono::prelude::Utc;
use failure::Error;
use serde_json::json;
use std::collections::HashMap;
use deadpool_postgres::Pool;
use uuid::Uuid;
use futures::future::join_all;



async fn demo(pool:&Pool, workspace_name:&str, trace_count:&usize, point_count:&usize) -> Result<(), Error> {
    println!("start {}", workspace_name);
    let conn = pool.get().await?;
    let workspace_id =
        register_workspace(&conn, workspace_name, &json!({"A": 1, "B":"text", "C": 0.1})).await?;

    let mut trace_ids: Vec<Uuid> = vec![];
    for i in 0..*trace_count  {
        let id = register_trace(&conn, &workspace_id, &format!("trace{}", i)).await?;
        trace_ids.push(id);
    }

    for i in 0..*point_count {
        let values: HashMap<Uuid, f64> = trace_ids
            .iter()
            .map(|x| (x.to_owned(), i as f64))
            .collect();
        add_scalars(&conn, &values, &Utc::now()).await?;
    }
    println!("end {}", workspace_name);
    Ok(())
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    let pool = create_connection_pool().unwrap();
    let patterns = [
        ("demo0", 10, 1000),
        ("demo1", 10, 1000),
        ("demo2", 3, 10000),
    ];
    let futs = patterns
        .iter()
        .map(|(x, y, z)| demo(&pool,x, y, z))
        .collect::<Vec<_>>();
    join_all(futs).await;
    Ok(())
}
