use chrono::prelude::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Point<T> 
where T: PartialEq
{
    pub ts: DateTime<Utc>,
    pub value: f64,
    pub trace_id: T,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Trace<T> 
where T: PartialEq
{
    pub id: T,
    pub name: String,
}
