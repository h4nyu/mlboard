use uuid::Uuid;
pub mod entities;
pub mod usecase;
use crate::domain::entities::Point;

pub trait Repository<T> {
    fn all(&mut self) -> Vec<T>;
    fn get(&mut self, id: Uuid) -> Option<T>;
}

pub trait PointRepository: Repository<Point> {}
