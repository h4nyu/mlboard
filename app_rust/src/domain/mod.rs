pub mod entities;
pub mod usecases;
use std::error::Error;
use crate::domain::entities::{Point, Trace};

pub trait PointRepository {
    type Id: PartialEq;
    fn all(&self) -> Result<Vec<Point<Self::Id>>, Box<dyn Error>>;
    fn get(&self, id: Self::Id) -> Result<Option<Point<Self::Id>>, Box<dyn Error>>;
    fn bulk_insert(&self, rows: &[Point<Self::Id>]) -> Result<usize, Box<dyn Error>>;
    fn clear(&self) -> Result<(), Box<dyn Error>>;
}

pub trait TraceRepository {
    type Id: PartialEq;
    fn all(&self) -> Result<Vec<Trace<Self::Id>>, Box<dyn Error>>;
    fn clear(&self) -> Result<(), Box<dyn Error>>;
}
