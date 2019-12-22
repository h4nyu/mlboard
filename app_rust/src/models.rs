use chrono::prelude::{DateTime, Utc};
use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize)]
pub struct Point {
    pub ts: DateTime<Utc>,
    pub value: f64,
    pub trace_id: Uuid,
}
