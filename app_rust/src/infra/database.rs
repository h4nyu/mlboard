use chrono::prelude::{Utc, DateTime};
use postgres::{Client,  NoTls, ToStatement, Row};
use serde::{Serialize, Deserialize};
use uuid::Uuid;
use rayon::prelude::*;
use crate::repository::{ModelRepository};
use crate::models::{Point};
use std::io::{Write};
use std::time::{Instant};

fn with_connection<F>(f: F)
    where F:Fn(&mut Client) -> () {
    let mut client = Client::connect("host=db user=mlboard password=mlboard", NoTls).unwrap();
    f(&mut client);
}

pub struct PointRepository<'a> {
    conn: &'a mut Client,
    table_name: &'static str,
}

impl <'a> PointRepository<'a> {
    pub fn new(conn: &mut Client) -> PointRepository {
        return PointRepository{
            conn: conn,
            table_name: "points",
        }
    }

    fn to_model(row: &Row) -> Point {
        Point{
            ts: row.get("ts"),
            trace_id: row.get("trace_id"),
            value: row.get("value"),
        }
    }
}
impl<T, M> ModelRepository<M> for T where T: PointRepository {
    fn all(&mut self) -> Vec<Point> {
        return self.conn.query::<str>(&format!("SELECT * FROM {}", self.table_name), &[])
            .unwrap()
            .iter()
            .map(PointRepository::to_model)
            .collect::<Vec<Point>>();
    }

    fn bulk_insert(&mut self, rows: &[Point]) -> u64 {
        let mut wtr = self.conn.copy_in::<str>(&format!("COPY {} FROM STDIN CSV", self.table_name)).unwrap();
        let data = rows.iter()
            .map(|x| {
                format!("{ts},{value},{trace_id}\n",
                        ts=x.ts,
                        value=x.value,
                        trace_id=&x.trace_id)
            })
            .collect::<Vec<String>>()
            .join("");
        wtr.write_all(data.as_bytes()).unwrap();
        return wtr.finish().unwrap()
    }

    fn clear(&mut self){
        self.conn.execute::<str>(&format!("TRUNCATE TABLE {}", self.table_name), &[]).unwrap();
    }
}


#[cfg(test)]
mod tests {
    use super::*;

    pub fn setup(repo: &mut PointRepository){
        repo.clear();
    }

    #[test]
    fn test_all() {
        let trace_id = Uuid::new_v4();
        let now = Instant::now();
        let rows = (0..100)
            .map(|x| Point{
                value:x as f64,
                ts: Utc::now(),
                trace_id: trace_id,
            })
        .collect::<Vec<Point>>();
        println!("{:?}", now.elapsed());

        with_connection(|client| {
            let mut repo = PointRepository::new(client);
            setup(&mut repo);
            let now = Instant::now();
            let count = repo.bulk_insert(&rows);
            println!("{:?}", now.elapsed());
            let now = Instant::now();
            let points = repo.all();
            println!("{:?}", now.elapsed());
        })
    }
}

