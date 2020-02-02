use failure::Error;
use app::infra::database::Postgresql;
use app::usecase::*;
use serde_json::json;
use uuid::Uuid;
use std::collections::HashMap;
use chrono::prelude::{Utc};

fn main() -> Result<(), Error> {
    let mut repo = Postgresql::new()?;
    {
        let workspace_id = register_workspace(
            &mut repo,
            "demo", 
            &json!({"A": 1, "B":"text", "C": 0.1})
        )?;
        let trace_ids:Vec<Uuid> = ["trace0", "trace1"]
            .iter()
            .flat_map(|x| {
                register_trace(
                    &mut repo,
                    &workspace_id, 
                    x,
                )
            })
            .collect();
        for _i in 0..10000{
            let values:HashMap<Uuid, f64> = trace_ids
                .iter()
                .map(|x| (x.to_owned(), 0.0))
                .collect();
            add_scalars(
                &mut repo,
                &values,
                &Utc::now(),
            )?;
        }
    }
    Ok(())
}
