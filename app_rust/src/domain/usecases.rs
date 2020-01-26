use std::error::Error;
use crate::domain::{PointRepository, TraceRepository};

pub struct Usecase<'a, T, U>
where
    T: PointRepository,
    U: TraceRepository,
{
    point_repo: &'a T,
    trace_repo: &'a U,
}

impl<'a, T, U> Usecase<'a, T, U>
where
    T: PointRepository,
    U: TraceRepository,
{
    pub fn some(&self) -> Result<(), Box<dyn Error>> {
        self.point_repo.all()?;
        self.trace_repo.all()?;
        Ok(())
    }
}

pub fn register<T ,U>(
    point_repo: &T,
    trace_repo: &U,
)  -> Result<(), Box<dyn Error>> 
where T: PointRepository,
      U: TraceRepository,
{
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::domain::entities::{Point, Trace};
    struct Mock;

    impl PointRepository for Mock{
        type Id = u32;
        fn all(&self) -> Result<Vec<Point<Self::Id>>, Box<dyn Error>>{
            Ok(vec![])
        }
        fn get(&self, id: Self::Id) -> Result<Option<Point<Self::Id>>, Box<dyn Error>>{
            Ok(None)
        }
        fn bulk_insert(&self, row: &[Point<Self::Id>]) -> Result<usize, Box<dyn Error>> {
            Ok(0)
        }
        fn clear(&self) -> Result<(), Box<dyn Error>> {
            Ok(())
        }
    }

    impl TraceRepository for Mock{
        type Id = u32;
        fn all(&self) -> Result<Vec<Trace<Self::Id>>, Box<dyn Error>>{
            Ok(vec![])
        }
        fn clear(&self) -> Result<(), Box<dyn Error>> {
            Ok(())
        }
    }

    #[test]
    fn test_all() -> Result<(), Box<dyn Error>> {
        let mock = Mock{};
        let uc = Usecase {
            point_repo: &mock,
            trace_repo: &mock,
        };
        uc.some()
    }
}
