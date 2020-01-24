use crate::domain::entities::{Point, Trace};
use postgres::{Client, NoTls, Row};
use serde::Serialize;
use std::error::Error;
use std::fmt::Debug;

pub trait SQLable {
    fn table_name() -> &'static str;
    fn from_row(row: &Row) -> Self;
}

struct Postgresql(Client);
impl Postgresql {
    pub fn new() -> Result<Self, Box<dyn Error>> {
        let client = Client::connect("host=db user=mlboard password=mlboard", NoTls)?;
        Ok(Postgresql(client))
    }
}

impl SQLable for Point {
    fn table_name() -> &'static str {
        "points"
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
    fn table_name() -> &'static str {
        "traces"
    }
    fn from_row(row: &Row) -> Self {
        Self {
            id: row.get("id"),
            name: row.get("name"),
            created_at: row.get("created_at"),
            updated_at: row.get("updated_at"),
        }
    }
}

pub trait Repository<T> {
    fn all(&mut self) -> Result<Vec<T>, Box<dyn Error>>;
    fn bulk_insert(&mut self, rows: &[T]) -> Result<u64, Box<dyn Error>>;
    fn clear(&mut self) -> Result<(), Box<dyn Error>>;
}

impl<T> Repository<T> for Postgresql
where
    T: SQLable + Serialize + Debug,
{
    fn all(&mut self) -> Result<Vec<T>, Box<dyn Error>> {
        let sql = format!("SELECT * from {}", T::table_name());
        &self.0.query(&sql[..], &[])?;
        Ok(vec![])
    }

    fn bulk_insert(&mut self, rows:&[T]) -> Result<u64, Box<dyn Error>> {
        Ok(0)
    }

    fn clear(&mut self) -> Result<(), Box<dyn Error>> {
        let sql = format!("TRUNCATE TABLE {}", T::table_name());
        &self.0.query(&sql[..], &[])?;
        Ok(())
    }
}


#[cfg(test)]
mod tests {
    use super::*;
    use uuid::Uuid;
    use chrono::prelude::{DateTime, Utc};

    #[test]
    fn test_all() -> Result<(), Box<dyn Error>> {
        let mut conn = Postgresql::new()?;
        {
            let repo: &mut dyn Repository<Point> = &mut conn;
            repo.clear()?;
        }
        {
            let repo: &mut dyn Repository<Trace> = &mut conn;
            repo.clear()?;
        }
        Ok(())
    }

    #[test]
    fn test_bulk_insert() -> Result<(), Box<dyn Error>> {
        let mut conn = Postgresql::new()?;

        let trace_id = Uuid::new_v4();
        let count = 100;
        let rows:Vec<Point> = (0..count)
            .map(|_x| {Point{
                trace_id: trace_id,
                ts:Utc::now(),
                value: 0.0
            }})
            .collect();

        {
            let repo :&mut dyn Repository<Point> = &mut conn;
            repo.bulk_insert(&rows)?;
        }
        Ok(())
    }
}
