use app::infra::database::create_connection_pool;
use app::usecase::*;

use failure::Error;
use chrono::prelude::Utc;
use serde_json::json;
use uuid::Uuid;
use std::collections::HashMap;

#[tokio::test]
async fn test_add_scalars() -> Result<(), Error> {
    let pool = create_connection_pool()?;
    let conn = pool.get().await?;
    let workspace_id = register_workspace(
        &conn,
        &RegisterWorkspace{
            name: "test".to_owned(),
            params: json!({"A": 1, "B":"text", "C": 0.1}),
        }
    ).await?;
    let trace_id = register_trace(&conn, &workspace_id, "trace0").await?;
    let values: HashMap<Uuid, f64> = [trace_id].iter().map(|x| (x.to_owned(), 1.0)).collect();
    add_scalars(&conn, &AddScalars{ values:values, ts: Utc::now() }).await?;
    Ok(())
}
