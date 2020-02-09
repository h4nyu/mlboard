use chrono::prelude::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use serde_json::Value;
use std::convert::Into;
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize)]
pub struct Workspace {
    pub id: Uuid,
    pub name: String,
    pub params: Value,
    pub created_at: DateTime<Utc>,
}

impl Workspace {
    pub fn new(name: &str, params: &Value) -> Self {
        Workspace {
            id: Uuid::new_v4(),
            created_at: Utc::now(),
            name: name.to_owned(),
            params: params.to_owned(),
        }
    }
}

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
    pub workspace_id: Uuid,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

impl Trace {
    pub fn new(name: &str, workspace_id: &Uuid) -> Self {
        Self {
            id: Uuid::new_v4(),
            name: name.to_owned(),
            workspace_id: workspace_id.to_owned(),
            created_at: Utc::now(),
            updated_at: Utc::now(),
        }
    }
}
