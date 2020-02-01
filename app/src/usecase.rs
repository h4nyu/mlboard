// use crate::domain::entities::*;
// use crate::domain::*;
// use chrono::prelude::{DateTime, Utc};
// use failure::Error;
// use std::collections::HashMap;
// use uuid::Uuid;
//
// pub fn register<R>(repo: &R, name: &str, workspace_id: &Uuid) -> Result<Uuid, Error>
// where
//     R: TraceRepository + BulkInsert<Trace>,
// {
//     let trace = repo.get_by_name_workspace_id(name, workspace_id)?;
//     let id = match trace {
//         Some(x) => x.id,
//         None => {
//             let mut new_trace = Trace::new();
//             new_trace.name = name.to_owned();
//             new_trace.workspace_id = workspace_id.to_owned();
//             repo.bulk_insert(&[&new_trace])?;
//             new_trace.id
//         }
//     };
//     Ok(id)
// }
//
// pub fn get_trace_all<R>(repo: &R) -> Result<Vec<Trace>, Error>
// where
//     R: GetAll<Trace>,
// {
//     repo.get_all()
// }
//
// pub fn find_point_by_range<R>(
//     repo: &R,
//     trace_id: &Uuid,
//     from_date: &DateTime<Utc>,
//     to_date: &DateTime<Utc>,
// ) -> Result<Vec<Point>, Error>
// where
//     R: GetByRange<Point, Uuid>,
// {
//     repo.get_by_range(trace_id, from_date, to_date)
// }
//
// pub fn add_scalars<R, T>(
//     point_repo: &R,
//     trace_repo: &T,
//     values: &HashMap<Uuid, f64>,
//     ts: &DateTime<Utc>,
// ) -> Result<(), Error>
// where
//     R: BulkInsert<Point>,
//     T: UpdateLastTs<Trace, Uuid>,
// {
//     let points: Vec<Point> = values
//         .iter()
//         .map(|(k, v)| {
//             let mut p = Point::new();
//             p.value = v.to_owned();
//             p.trace_id = k.to_owned();
//             p
//         })
//         .collect();
//     point_repo.bulk_insert(&points.iter().collect::<Vec<_>>())?;
//     trace_repo.update_last_ts(&points.iter().map(|x| &x.trace_id).collect::<Vec<_>>(), ts)?;
//
//     Ok(())
// }
