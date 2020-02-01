use crate::domain::entities::*;
use crate::domain::*;
use chrono::prelude::{DateTime, Utc};
use csv::{QuoteStyle, WriterBuilder};
use failure::Error;
use postgres::{Client, NoTls, Row, types::ToSql, types::Type};
use std::error::Error as StdError;
use std::collections::{HashMap};
use serde::Serialize;
use std::fmt::Debug;
use std::io::Write;
use std::sync::Mutex;
use uuid::Uuid;

pub trait Table {
    fn table_name() -> &'static str;
    fn from_row(row: &Row) -> Self;
}

struct Postgresql(Client);

impl Table for Point {
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

impl Table for Trace {
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



// impl TraceRepository for Postgresql {
//     fn get(&self, name: &str, workspace_id: &Uuid) -> Result<Option<Trace>, Error> {
//         let row = self
//             .0
//             .lock()
//             .unwrap()
//             .query_opt(&sql[..], &[&name.to_owned(), workspace_id])?
//             .map(|x| Trace::from_row(&x));
//         Ok(row)
//     }
//     fn update_last_ts(&self, ids: &[&Uuid], ts: &DateTime<Utc>) -> Result<(), Error> {
//         let sql = format!(
//             "UPDATE {}
//             SET updated_at = $1
//             WHERE id = ANY($2)
//             ",
//             Trace::table_name(),
//         );
//         self.0.lock().unwrap().execute(&sql[..], &[ts, &ids])?;
//         Ok(())
//     }
// }
impl TraceRepository for Postgresql {
    fn get(&mut self, name: &str, workspace_id: &Uuid) -> Result<Vec<Trace>, Error>{
        // let sql = format!(
        //     "SELECT value, ts
        //     FROM {}
        //     WHERE name = $1 AND workspace_id = $2
        //     ORDER BY ts ASC",
        //     Trace::table_name(),
        // );
        // let row = self
        //     .0
        //     .query(&sql[..], &[&args.name, &args.workspace_id])?
        //     .iter()
        //     .map(|x| Trace::from_row(&x))
        //     .collect::<Vec<_>>();
        // Ok(row)
        Ok(vec![])
    }
}

struct TraceGetArg<'a> {
    name: &'a str,
    workspace_id: &'a Uuid,
}

// impl GetByRange<T, U> for Postgresql {
//     fn get_by_range(&self, trace_id:&U, from_date:&DateTime<Utc>, to_date:&DateTime<Utc>) -> Result<Vec<Point>, Error> {
//         let sql = format!(
//             "SELECT value, ts
//             FROM {}
//             WHERE trace_id = $1
//             AND ts BETWEEN $2 AND $3
//             ORDER BY ts ASC",
//             Point::table_name(),
//         );
//         let rows: Vec<Point> = self
//             .0
//             .lock()
//             .unwrap()
//             .query(&sql[..], &[trace_id, from_date, to_date])?
//             .iter()
//             .map(Point::from_row)
//             .collect();
//         Ok(rows)
//     }
// }
impl <T> GetAll<T> for Postgresql
where T:Table + Serialize
{
    fn get_all(&mut self) -> Result<Vec<T>, Error> {
        let sql = format!("SELECT * from {}", T::table_name());
        let rows: Vec<T> = self
            .0
            .query(&sql[..], &[])?
            .iter()
            .map(T::from_row)
            .collect();
        Ok(rows)
    }
}

impl <T> BulkInsert<T> for Postgresql
where T:Table + Serialize
{
    fn bulk_insert(&mut self, rows: &[&T]) -> Result<usize, Error> {
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

        let mut copy_in_writer = self.0.copy_in::<str>(&format!(
            "COPY {} ({}) FROM STDIN CSV HEADER",
            T::table_name(),
            &header
        ))?;
        copy_in_writer.write_all(data.as_bytes())?;
        Ok(copy_in_writer.finish()? as usize)
    }
}
impl<T> Clear<T> for Postgresql
where T:Table + Serialize
{
    fn clear(&mut self) -> Result<(), Error> {
        let sql = format!("TRUNCATE TABLE {}", T::table_name());
        self.0.execute(&sql[..], &[])?;
        Ok(())
    }
}
// impl ToSql for ColumnType {
//     fn to_sql(
//         &self,
//         ty: &Type,
//         out: &mut BytesMut,
//     ) -> Result<IsNull, Box<dyn StdError + Sync + Send>> {
//         match *self {
//             Text(ref val) => val.to_sql(ty, out),
//             _ => Ok(IsNull::Yes),
//         }
//     }
//
//     fn accepts(ty: &Type) -> bool {
//         <T as ToSql>::accepts(ty)
//     }
//
//     to_sql_checked!();
// }

impl Postgresql {
    pub fn new() -> Result<Self, Error> {
        let client = Client::connect("host=db user=mlboard password=mlboard", NoTls)?;
        Ok(Postgresql(client))
    }
    pub fn get_by_args<T>(
        &mut self,
        table_name: &str,
        conditions: &[(&str, &(dyn ToSql + Sync))]
    ) -> Result<Vec<T>, Error> 
        where T: Table,
    {
        println!("{:?}",conditions);
        let values = conditions.iter().map(|x| x.1).collect::<Vec<_>>();
        let where_stmt:String = conditions
            .iter()
            .map(|(k, v)| k.to_owned())
            .enumerate()
            .map(|(i, v)| format!("{} = ${}", v, i+1))
            .collect::<Vec<String>>()
            .join(" AND ");
        let sql = format!(
            "SELECT * FROM {} WHERE {};",
            table_name,
            where_stmt,
        );
        println!("{}",sql);
        self.0.execute(&sql[..], &values[..])?;
        Ok(vec![])

    }
}

#[derive(Debug)]
pub enum ColumnType {
    Uuid(Uuid),
    Text(String),
}

#[cfg(test)]
mod tests {
    use super::*;
    use maplit::{hashmap};
    #[test]
    fn test() -> Result<(), Error> {
        let mut repo = Postgresql::new()?;

        let rows:Vec<Trace> = repo.get_by_args(
            "traces",
            &[
                ( "name", &"aaaa"), 
                ( "workspace_id", &Uuid::new_v4())
            ],
        )?;
        // let rows:Vec<Trace> = repo.get(
        //     TraceGetArg{
        //         name: "aa",
        //         workspace_id: &Uuid::new_v4(),
        //     }
        // )?;
        Ok(())
    }
}
