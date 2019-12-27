use crate::models::{Point, Trace};
use chrono::prelude::Utc;
use postgres::{Client, NoTls, Row};
use rayon::prelude::*;
use serde::Serialize;
use std::io::Write;
use uuid::Uuid;

pub fn with_connection<F>(f: F)
where
    F: Fn(&mut Client) -> (),
{
    let mut client = Client::connect("host=db user=mlboard password=mlboard", NoTls).unwrap();
    f(&mut client);
}

pub struct PointRepository<'a, T> {
    conn: &'a mut Client,
    table_name: &'static str,
    to_model: fn() -> T,
}

pub fn to_point() -> Point {
    Point {
        ts: Utc::now(),
        value: 0.1,
        trace_id: Uuid::new_v4(),
    }
}

pub fn to_trace() -> Trace {
    Trace {
        id: Uuid::new_v4(),
        name: "aaaa".to_string(),
        created_at: Utc::now(),
        updated_at: Utc::now(),
    }
}

impl<'a> PointRepository<'a, Point> {
    pub fn new(client: &'a mut Client) -> PointRepository<'a, Point> {
        return PointRepository::<Point> {
            conn: client,
            table_name: "points",
            to_model: to_point,
        };
    }
}

impl<'a> PointRepository<'a, Trace> {
    pub fn new(client: &'a mut Client) -> PointRepository<'a, Trace> {
        return PointRepository::<Trace> {
            conn: client,
            table_name: "traces",
            to_model: to_trace,
        };
    }
}

pub trait Repository<T> {
    fn clear(&mut self);
}

impl<'a> Repository<Trace> for PointRepository<'a, Trace> {
    fn clear(&mut self) {
        println!("{:?}", self.table_name);
        self.conn
            .execute::<str>(&format!("TRUNCATE TABLE {}", self.table_name), &[])
            .unwrap();
    }
}

impl<'a> Repository<Point> for PointRepository<'a, Point> {
    fn clear(&mut self) {
        println!("{:?}", self.table_name);
        self.conn
            .execute::<str>(&format!("TRUNCATE TABLE {}", self.table_name), &[])
            .unwrap();
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn with_point_repo(repo: &mut Repository<Point>) {
        repo.clear();
    }

    fn with_trace_repo(repo: &mut Repository<Trace>) {
        repo.clear();
    }

    #[test]
    fn test_all() {
        with_connection(|client| {
            let mut repo_point = PointRepository::<Point>::new(client);
            repo_point.clear();
            let mut repo_trace = PointRepository::<Trace>::new(client);
            repo_trace.clear();
            // with_point_repo(&mut repo);
            // with_trace_repo(&mut repo);
        })
    }
}
