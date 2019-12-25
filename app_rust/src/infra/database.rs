use chrono::prelude::{Utc};
use postgres::{Client,  NoTls, Row};
use serde::{Serialize};
use uuid::Uuid;
use rayon::prelude::*;
use csv::Writer;
use crate::models::{Point};
use std::io::{Write};

pub fn with_connection<F>(f: F)
    where F:Fn(&mut Client) -> () {
    let mut client = Client::connect("host=db user=mlboard password=mlboard", NoTls).unwrap();
    f(&mut client);
}

pub struct Repository<'a> {
    conn: &'a mut Client,
    table_name: &'static str,
}

pub trait IRepository<T> {
    fn all(&mut self) -> Vec<T>;
    fn clear(&mut self);
    fn bulk_insert(&mut self, rows: &[T]) -> u64;
}

pub trait ConvertTo<T> {
    fn to(row: &Row) -> T;
}

impl <'a> ConvertTo<Point> for Repository<'a> {
    fn to(row: &Row) -> Point {
        Point{
            ts: row.get("ts"),
            value: row.get("value"),
            trace_id: row.get("trace_id"),
        }
    }
}
impl<'a, T> IRepository<T> for Repository<'a> 
where Self: ConvertTo<T>, T: Serialize
{
    fn all(&mut self) -> Vec<T> {
        return self.conn.query::<str>(&format!("SELECT * FROM {}", self.table_name), &[])
            .unwrap()
            .iter()
            .map(Self::to)
            .collect::<Vec<T>>();
    }

    fn bulk_insert(&mut self, rows: &[T]) -> u64 {
        let mut wtr = self.conn.copy_in::<str>(&format!("COPY {} FROM STDIN CSV HEADER", self.table_name)).unwrap();
        let mut csv_wtr = Writer::from_writer(vec![]);
        rows.iter().for_each(|x|{csv_wtr.serialize(x).unwrap();});
        let data = String::from_utf8(csv_wtr.into_inner().unwrap()).unwrap();
        wtr.write_all(data.as_bytes()).unwrap();
        return wtr.finish().unwrap()
    }

    fn clear(&mut self){
        self.conn.execute::<str>(&format!("TRUNCATE TABLE {}", self.table_name), &[]).unwrap();
    }
}

impl <'a> Repository<'a> {
    pub fn new(conn: &mut Client) -> Repository {
        return Repository{
            conn: conn,
            table_name: "points",
        }
    }
}


#[cfg(test)]
mod tests {
    use super::*;

    pub fn setup(repo: &mut dyn IRepository<Point>){
        repo.clear();
    }

    #[test]
    fn test_all() {
        let trace_id = Uuid::new_v4();
        let count = 10000;
        let rows = (0..count)
            .map(|x| Point{
                value:x as f64,
                ts: Utc::now(),
                trace_id: trace_id,
            })
        .collect::<Vec<Point>>();
        with_connection(|client| {
            let mut repo = Repository::new(client);
            setup(&mut repo);
            let queried_count = repo.bulk_insert(&rows);
            assert_eq!(queried_count, count);
        })
    }
}

