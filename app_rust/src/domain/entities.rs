use chrono::prelude::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize)]
pub struct Point {
    pub ts: DateTime<Utc>,
    pub value: f64,
    pub trace_id: Uuid,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Trace {
    pub id: Uuid,
    pub name: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}
