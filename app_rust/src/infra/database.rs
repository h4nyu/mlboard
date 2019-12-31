use crate::domain::entities::{Point, Trace};
use crate::domain::usecase::{HavePointQuery, HaveTraceQuery};
use crate::domain::{PointRepository, Repository, TraceRepository};
use chrono::prelude::{DateTime, Utc};
use postgres::{types::ToSql, Client, NoTls, Row};
use rayon::prelude::*;
use serde::Serialize;
use uuid::Uuid;

pub struct Postgresql(Client);
pub struct QueryValue<'a>(&'static str, &'a dyn ToSql);

pub trait SQLable {
    fn select() -> &'static str;
    fn from_row(row: &Row) -> Self;
}

impl Postgresql {
    pub fn new() -> Postgresql {
        Postgresql(Client::connect("host=db user=mlboard password=mlboard", NoTls).unwrap())
    }
}

impl SQLable for Point {
    fn select() -> &'static str {
        "SELECT * FROM points"
    }
    fn from_row(row: &Row) -> Self {
        Self {
            value: row.get("value"),
            trace_id: row.get("trace_id"),
            ts: row.get("ts"),
        }
    }
}

impl SQLable for Trace {
    fn select() -> &'static str {
        "SELECT * FROM traces"
    }
    fn from_row(row: &Row) -> Self {
        Self {
            id: row.get("id"),
            name: row.get("name"),
            updated_at: row.get("updated_at"),
            created_at: row.get("created_at"),
        }
    }
}

impl<T: SQLable> Repository<T> for Postgresql {
    fn all(&mut self) -> Vec<T> {
        return self
            .0
            .query::<str>(T::select(), &[])
            .unwrap()
            .iter()
            .map(T::from_row)
            .collect::<Vec<T>>();
    }

    fn get(&mut self, id: Uuid) -> Option<T> {
        return None;
    }
}
impl PointRepository for Postgresql {}
impl TraceRepository for Postgresql {}

impl HavePointQuery for Postgresql {
    fn point_query(&mut self) -> &mut dyn PointRepository {
        return self;
    }
}

impl HaveTraceQuery for Postgresql {
    fn trace_query(&mut self) -> &mut dyn TraceRepository {
        return self;
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    fn test_all<R>(mut repo: R) -> ()
    where
        R: Repository<Point>,
    {
        repo.all();
    }
    #[test]
    fn test_point_usecase() {
        let repo = Postgresql::new();
        test_all(repo);
    }
}
