use crate::domain::entities::*;
use crate::domain::*;
use chrono::prelude::{DateTime, Utc};
use csv::{QuoteStyle, WriterBuilder};
use failure::Error;
use postgres::{Client, NoTls, Row};
use serde::Serialize;
use std::fmt::Debug;
use std::io::Write;
use std::sync::Mutex;
use uuid::Uuid;

pub trait SQLable {
    fn table_name() -> &'static str;
    fn from_row(row: &Row) -> Self;
}

struct Postgresql(Mutex<Client>);
impl Postgresql {
    pub fn new() -> Result<Self, Error> {
        let client = Client::connect("host=db user=mlboard password=mlboard", NoTls)?;
        Ok(Postgresql(Mutex::new(client)))
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
            workspace_id: row.get("workspace_id"),
            created_at: row.get("created_at"),
            updated_at: row.get("updated_at"),
        }
    }
}
impl TraceRepository for Postgresql {
    fn get(&self, name: &str, workspace_id: &Uuid) -> Result<Option<Trace>, Error> {
        let sql = format!(
            "SELECT value, ts
            FROM {}
            WHERE name = $1 AND workspace_id = $2
            ORDER BY ts ASC",
            Trace::table_name(),
        );
        let row = self
            .0
            .lock()
            .unwrap()
            .query_opt(&sql[..], &[&name.to_owned(), workspace_id])?
            .map(|x| Trace::from_row(&x));
        Ok(row)
    }
    fn update_last_ts(&self, ids: &[&Uuid], ts: &DateTime<Utc>) -> Result<(), Error> {
        let sql = format!(
            "UPDATE {}
            SET updated_at = $1
            WHERE id = ANY($2)
            ",
            Trace::table_name(),
        );
        self.0.lock().unwrap().execute(&sql[..], &[ts, &ids])?;
        Ok(())
    }
}

impl PointRepository for Postgresql {
    fn range_by(&self) -> Result<Vec<Point>, Error> {
        let sql = format!(
            "SELECT value, ts
            FROM {}
            WHERE trace_id = $1
            AND ts BETWEEN $2 AND $3
            ORDER BY ts ASC",
            Point::table_name(),
        );
        let rows: Vec<Point> = self
            .0
            .lock()
            .unwrap()
            .query(&sql[..], &[])?
            .iter()
            .map(Point::from_row)
            .collect();
        Ok(rows)
    }
}

impl<T> Repository<T> for Postgresql
where
    T: SQLable + Serialize + Debug,
{
    fn all(&self) -> Result<Vec<T>, Error> {
        let sql = format!("SELECT * from {}", T::table_name());
        let rows: Vec<T> = self
            .0
            .lock()
            .unwrap()
            .query(&sql[..], &[])?
            .iter()
            .map(T::from_row)
            .collect();
        Ok(rows)
    }

    fn bulk_insert(&self, rows: &[&T]) -> Result<usize, Error> {
        let mut csv_wtr = WriterBuilder::new()
            .quote_style(QuoteStyle::NonNumeric)
            .from_writer(vec![]);
        for r in rows {
            csv_wtr.serialize(r)?;
        }

        let data = String::from_utf8(csv_wtr.into_inner()?)?;

        let header = match data.lines().next() {
            Some(x) => x,
            None => return Ok(0),
        };

        let mut conn = self.0.lock().unwrap();
        let mut copy_in_writer = conn.copy_in::<str>(&format!(
            "COPY {} ({}) FROM STDIN CSV HEADER",
            T::table_name(),
            &header
        ))?;
        copy_in_writer.write_all(data.as_bytes())?;
        Ok(copy_in_writer.finish()? as usize)
    }

    fn clear(&self) -> Result<(), Error> {
        let sql = format!("TRUNCATE TABLE {}", T::table_name());
        self.0.lock().unwrap().execute(&sql[..], &[])?;
        Ok(())
    }
}
//
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_all() -> Result<(), Error> {
        let repo = Postgresql::new()?;
        let point_repo: &dyn Repository<Point> = &repo;
        point_repo.clear()?;
        Ok(())
    }
}
