use app::infra::database::{create_connection_pool};
use app::usecase::*;
use chrono::prelude::Utc;
use serde_json::json;
use std::collections::HashMap;
use uuid::Uuid;
use failure::Error;

#[tokio::main]
async fn main() -> Result<(), Error>{
    let pool = create_connection_pool().unwrap();
    let conn = pool.get().await?;
    let workspace_id = register_workspace(&conn, "demo", &json!({"A": 1, "B":"text", "C": 0.1})).await?;

    let mut trace_ids: Vec<Uuid> = vec![];
    for name in ["trace0", "trace1"].iter() {
        let id = register_trace(&conn, &workspace_id, name).await?;
        trace_ids.push(id);
    };

    for _i in 0..10000 {
        let values: HashMap<Uuid, f64> = trace_ids.iter().map(|x| (x.to_owned(), 0.0)).collect();
        add_scalars(&conn, &values, &Utc::now()).await?;
    };
    Ok(())
}
