use uuid::Uuid;
pub mod entities;
pub mod usecase;
use crate::domain::entities::{Point, Trace};
use std::error::Error;
use async_trait::async_trait;

#[async_trait]
pub trait Repository<T> 
{
    async fn all(&self) -> Result<Vec<T>, Box<Error>>;
    // fn bulk_insert(&self, rows: &[T]) -> Result<u64, Box<Error>>;
    // fn get(&self, id: Uuid) -> Result<Option<T>, Box<Error>>;
    async fn clear(&self) -> Result<(), Box<Error>>;
}

// pub trait PointRepository: Repository<Point> {}
// pub trait TraceRepository: Repository<Trace> {}
//
// pub trait Transition {
//     fn with_tx<F>(&self, f: F) -> ()
//     where
//         F: Fn() -> Result<(), ()>;
// }
