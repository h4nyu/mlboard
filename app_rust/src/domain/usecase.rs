// use crate::domain::entities::{Point, Trace};
// use crate::domain::{PointRepository, TraceRepository};
//
// pub trait HavePointQuery {
//     fn point_query(&self) -> &dyn PointRepository;
// }
//
// pub trait HaveTraceQuery {
//     fn trace_query(&self) -> &dyn TraceRepository;
// }
//
// pub trait PointUsecase {
//     fn all_points(&self) -> Vec<Point>;
//     fn all_traces(&self) -> Vec<Trace>;
// }
// impl<T> PointUsecase for T
// where
//     T: HavePointQuery + HaveTraceQuery,
// {
//     fn all_points(&self) -> Vec<Point> {
//         self.point_query().all();
//         self.trace_query().all();
//         return self.point_query().all();
//     }
//
//     fn all_traces(&self) -> Vec<Trace> {
//         return self.trace_query().all();
//     }
// }
