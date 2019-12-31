use uuid::Uuid;
pub mod entities;
pub mod usecase;
use crate::domain::entities::{Point, Trace};

pub trait Repository<T> {
    fn all(&self) -> Vec<T>;
    fn bulk_insert(&self, rows: &[T]) -> u64;
    fn get(&self, id: Uuid) -> Option<T>;
    fn clear(&self) -> ();
}

pub trait PointRepository: Repository<Point> {}
pub trait TraceRepository: Repository<Trace> {}

pub trait Transition {
    fn with_tx<F>(&self, f: F) -> ()
    where
        F: Fn() -> Result<(), ()>;
}
