#![allow(unused_imports)]
use chrono::prelude::{DateTime, Utc};
use csv::Writer;
use postgres::{Client, NoTls, Row, ToStatement};
use serde::{Deserialize, Serialize};
use std::error::Error;
use std::io::Write;
use std::sync::{Arc, Mutex};
use crate::domain::{PointRepository, TraceRepository};
use crate::domain::entities::{Point, Trace};
use uuid::Uuid;

pub trait SQLAble {
    fn table_name() -> &'static str;
    fn from(row: &Row) -> Self;
}

impl SQLAble for Point<Uuid> {
    fn table_name() -> &'static str {
        "points"
    }
    fn from(row: &Row) -> Self {
        Self {
            value: row.get("value"),
            ts: row.get("ts"),
            trace_id: row.get("trace_id"),
        }
    }
}
impl SQLAble for Trace<Uuid> {
    fn table_name() -> &'static str {
        "traces"
    }
    fn from(row: &Row) -> Self {
        Self {
            id: row.get("id"),
            name: row.get("name"),
        }
    }
}

fn clear<T>(client: &mut Client) -> Result<(), Box<dyn Error>>
where
    T: SQLAble,
{
    let sql = format!("TRUNCATE TABLE {}", T::table_name());
    client.simple_query(&sql[..])?;
    Ok(())
}

fn bulk_insert<T>(client: &mut Client, rows: &[T]) -> Result<usize, Box<dyn Error>> 
where T: SQLAble + Serialize
{
    let mut copy_writer = client.copy_in(
        &format!("COPY {} FROM STDIN CSV HEADER", T::table_name())[..]
    )?;
    let mut csv_wtr = Writer::from_writer(vec![]);
    for r in rows {
        csv_wtr.serialize(r)?
    }

    let data = String::from_utf8(csv_wtr.into_inner()?)?;
    copy_writer.write_all(data.as_bytes())?;
    copy_writer.finish()?;
    Ok(rows.len())
}


fn all<T>(client: &mut Client) -> Result<Vec<T>, Box<dyn Error>>
where
    T: SQLAble,
{
    let sql = format!("SELECT * FROM {}", T::table_name());
    let rows: Vec<T> = client.query(&sql[..], &[])?.iter().map(T::from).collect();
    Ok(rows)
}

pub struct Context {
    db_conn: Mutex<Client>,
}
impl Context {
    pub fn new() -> Result<Self, Box<dyn Error>> {
        let client = Client::connect("host=db user=mlboard password=mlboard", NoTls)?;
        Ok(Self {
            db_conn: Mutex::new(client),
        })
    }
}

impl PointRepository for Context {
    type Id = Uuid;
    fn all(&self) -> Result<Vec<Point<Self::Id>>, Box<dyn Error>> {
        all(&mut self.db_conn.lock().unwrap())
    }
    fn get(&self, id: Self::Id) -> Result<Option<Point<Self::Id>>, Box<dyn Error>> {
        let sql = format!("SELECT * FROM {} WHERE id = $1", Point::<Self::Id>::table_name());
        let row = self.db_conn.lock().unwrap().query_one(&sql[..], &[&id])?;
        Ok(None)
    }
    fn bulk_insert(&self, rows: &[Point<Uuid>]) -> Result<usize, Box<dyn Error>>{
        bulk_insert(
            &mut self.db_conn.lock().unwrap(),
            rows,
        )
    }
    fn clear(&self) -> Result<(), Box<dyn Error>> {
        clear::<Point<Self::Id>>(&mut self.db_conn.lock().unwrap())
    }
}

impl TraceRepository for Context {
    type Id = Uuid;
    fn all(&self) -> Result<Vec<Trace<Self::Id>>, Box<dyn Error>> {
        all(&mut self.db_conn.lock().unwrap())
    }
    fn clear(&self) -> Result<(), Box<dyn Error>> {
        clear::<Trace<Self::Id>>(&mut self.db_conn.lock().unwrap())
    }
}


#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() -> Result<(), Box<dyn Error>> {
        let context = Context::new()?;
        test_bulk_insert(&context)?;
        Ok(())
    }

    fn test_bulk_insert<T>(repo: &T) -> Result<(), Box<dyn Error>> 
        where T: PointRepository<Id=Uuid>
    {
        let trace_id = Uuid::new_v4();
        let count = 10000;
        let rows: Vec<Point<Uuid>> = (0..count)
            .map(|x| Point{
                value:x as f64,
                ts: Utc::now(),
                trace_id: trace_id,
            })
            .collect();
        repo.clear()?;
        let count = repo.bulk_insert(&rows)?;
        let rows = repo.all()?;
        assert_eq!(rows.len(), count);
        Ok(())
    }
}
