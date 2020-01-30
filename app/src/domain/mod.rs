use uuid::Uuid;
pub mod entities;
use crate::domain::entities::*;
use chrono::prelude::{DateTime, Utc};
use failure::Error;

pub trait Repository<T> {
    fn all(&self) -> Result<Vec<T>, Error>;
    fn bulk_insert(&self, rows: &[&T]) -> Result<usize, Error>;
    fn clear(&self) -> Result<(), Error>;
}

pub trait PointRepository: Repository<Point> {
    fn range_by(&self) -> Result<Vec<Point>, Error>;
}
pub trait TraceRepository: Repository<Trace> {
    fn get(&self, name: &str, workspace_id: &Uuid) -> Result<Option<Trace>, Error>;
    fn update_last_ts(&self, ids: &[&Uuid], ts: &DateTime<Utc>) -> Result<(), Error>;
}
//
// pub trait Transition {
//     fn with_tx<F>(&self, f: F) -> ()
//     where
//         F: Fn() -> Result<(), ()>;
// }
