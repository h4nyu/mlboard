use crate::domain::entities::{Point, Trace};
use crate::domain::usecase::PointService;
use crate::domain::usecase::{HavePointQuery, HaveTraceQuery};
use crate::domain::Repository;
use crate::infra::database::Postgresql;

impl HavePointQuery for Postgresql {
    fn point_query(&mut self) -> &mut dyn Repository<Point> {
        return self;
    }
}

impl HaveTraceQuery for Postgresql {
    fn trace_query(&mut self) -> &mut dyn Repository<Trace> {
        return self;
    }
}

pub fn find_all_traces() -> Vec<Trace> {
    let mut uc = Postgresql::new();
    uc.all_traces()
}
