use uuid::Uuid;
pub mod entities;
use crate::domain::entities::*;
use chrono::prelude::{DateTime, Utc};
use failure::Error;


pub trait GetAll<T> {
    fn get_all(&mut self) -> Result<Vec<T>, Error>;
}
pub trait BulkInsert<T>{
    fn bulk_insert(&mut self, rows: &[&T]) -> Result<usize, Error>;
}

pub trait Clear<T>{
    fn clear(&mut self) -> Result<(), Error>;
}


pub trait TraceRepository {
    fn get(&mut self, name: &str, workspace_id:&Uuid) -> Result<Vec<Trace>, Error>;
}
// pub trait GetByRange<T, U> {
//     fn get_by_range(&self, id:&U, from_date:&DateTime<Utc>, to_date:&DateTime<Utc>) -> Result<Vec<T>, Error>;
// }
//
// pub trait Get<T, U>{
//     fn get(&self, name: &str, workspace_id: &U) -> Result<Vec<T>, Error>;
// }
//
// pub trait UpdateLastTs<T, U>{
//     fn update_last_ts(&self, ids: &[&U], ts: &DateTime<Utc>) -> Result<(), Error>;
// }
//
// pub trait Transition<F>
// where F: Fn() -> Result<(), Error>
// {
//     fn with_tx(&self, f: F) -> Result<(), Error>
// }
