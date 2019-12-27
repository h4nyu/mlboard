use crate::models::{Point, Trace};
use chrono::prelude::Utc;
use postgres::{Client, NoTls, Row};
use rayon::prelude::*;
use serde::Serialize;

pub fn with_connection<F>(f: F)
where
    F: Fn(&mut Client) -> (),
{
    let mut client = Client::connect("host=db user=mlboard password=mlboard", NoTls).unwrap();
    f(&mut client);
}

// pub struct Table<'a> {
//     conn: &'a mut Client,
// }

pub trait Table<T> {
    fn get_table_name() -> &'static str;
    fn from_row(row: &Row) -> T;
}

impl Table<Point> for Client {
    fn get_table_name() -> &'static str {
        "points"
    }
    fn from_row(row: &Row) -> Point {
        Point {
            ts: row.get("ts"),
            value: row.get("value"),
            trace_id: row.get("trace_id"),
        }
    }
}

impl Table<Trace> for Client {
    fn get_table_name() -> &'static str {
        "traces"
    }
    fn from_row(row: &Row) -> Trace {
        Trace {
            id: row.get("id"),
            name: row.get("name"),
            created_at: row.get("created_at"),
            updated_at: row.get("updated_at"),
        }
    }
}

pub trait Repository<T> {
    fn all(&mut self) -> Vec<T>;
    fn clear(&mut self);
}

impl<T> Repository<T> for Client
where
    Self: Table<T>,
{
    fn all(&mut self) -> Vec<T> {
        let table_name = Self::get_table_name();
        return self
            .query::<str>(&format!("SELECT * FROM {}", table_name), &[])
            .unwrap()
            .iter()
            .map(Self::from_row)
            .collect::<Vec<T>>();
    }

    fn clear(&mut self) {
        let table_name = Self::get_table_name();
        self.execute::<str>(&format!("TRUNCATE TABLE {}", table_name), &[])
            .unwrap();
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    // fn with_point_repo(repo: &mut Repository<Point>) {
    //     repo.clear();
    // }
    //
    // fn with_trace_repo(repo: &mut Repository<Trace>) {
    //     repo.clear();
    // }

    #[test]
    fn test_all() {
        with_connection(|client| {
            let trace_repo = client as &mut dyn Repository<Point>;
            trace_repo.all();
            let point_repo = client as &mut dyn Repository<Trace>;
            point_repo.all();
            // let mut repo_point = PointRepository::<Point>::new(client);
            // repo_point.clear();
            // let mut repo_trace = PointRepository::<Trace>::new(client);
            // repo_trace.clear();
            // with_point_repo(&mut repo);
            // with_trace_repo(&mut repo);
        })
    }
}
