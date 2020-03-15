use chrono::prelude::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use std::convert::Into;
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize)]
pub struct Point {
    pub ts: DateTime<Utc>,
    pub value: f64,
    pub trace_id: Uuid,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct SlimPoint {
    pub ts: DateTime<Utc>,
    pub value: f64,
}

impl Into<SlimPoint> for Point {
    fn into(self) -> SlimPoint {
        SlimPoint {
            ts: self.ts,
            value: self.value,
        }
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Trace {
    pub id: Uuid,
    pub name: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

impl Default for Trace {
    fn default() -> Self {
        let now = Utc::now();
        Self {
            id: Uuid::new_v4(),
            name: "".to_owned(),
            created_at: now.to_owned(),
            updated_at: now.to_owned(),
        }
    }
}
