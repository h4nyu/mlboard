use chrono::prelude::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize)]
pub struct Point {
    pub ts: DateTime<Utc>,
    pub value: f64,
    pub trace_id: Uuid,
}
impl Point {
    pub fn new() -> Self {
        Point {
            ts: Utc::now(),
            value: 0.0,
            trace_id: Uuid::new_v4(),
        }
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Trace {
    pub id: Uuid,
    pub name: String,
    pub workspace_id: Uuid,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

impl Trace {
    pub fn new() -> Self {
        Self {
            id: Uuid::new_v4(),
            name: String::new(),
            workspace_id: Uuid::new_v4(),
            created_at: Utc::now(),
            updated_at: Utc::now(),
        }
    }
}
