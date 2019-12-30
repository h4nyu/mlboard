use crate::domain::entities::{Point, Trace};
use crate::domain::Repository;

pub trait HavePointQuery {
    fn point_query(&mut self) -> &mut Repository<Point>;
}

pub trait HaveTraceQuery {
    fn trace_query(&mut self) -> &mut Repository<Trace>;
}

pub trait PointService {
    fn all_points(&mut self) -> Vec<Point>;
    fn all_traces(&mut self) -> Vec<Trace>;
}
impl<T> PointService for T
where
    T: HavePointQuery + HaveTraceQuery,
{
    fn all_points(&mut self) -> Vec<Point> {
        self.point_query().all();
        self.trace_query().all();
        return self.point_query().all();
    }

    fn all_traces(&mut self) -> Vec<Trace> {
        return self.trace_query().all();
    }
}
