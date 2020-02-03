mod point;
mod trace;
mod workspace;
use crate::domain::entities::*;
use crate::domain::*;
use chrono::prelude::{DateTime, Utc};
use csv::{QuoteStyle, WriterBuilder};
use failure::Error;
use postgres::{types::ToSql, Client, NoTls, Row};
use serde::Serialize;
use std::io::Write;
use uuid::Uuid;

pub trait Table {
    fn table_name() -> &'static str;
    fn from_row(row: &Row) -> Self;
}

pub struct Postgresql(Client);

impl<T> GetAll<T> for Postgresql
where
    T: Table + Serialize,
{
    fn get_all(&mut self) -> Result<Vec<T>, Error> {
        let sql = format!("SELECT * from {}", T::table_name());
        self.query(&sql, &[])
    }
}

impl<T> BulkInsert<T> for Postgresql
where
    T: Table + Serialize,
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
where
    T: Table + Serialize,
{
    fn clear(&mut self) -> Result<(), Error> {
        let sql = format!("TRUNCATE TABLE {}", T::table_name());
        self.execute(&sql[..], &[])
    }
}

impl Postgresql {
    pub fn new() -> Result<Self, Error> {
        let client = Client::connect("host=db user=mlboard password=mlboard", NoTls)?;
        Ok(Postgresql(client))
    }

    fn get_equations(columns: &[&str], index: usize) -> Vec<String> {
        let mut equations: Vec<String> = vec![];
        for (i, k) in columns.iter().enumerate() {
            equations.push(format!("{} = ${}", k, i + 1 + index));
        }
        equations
    }

    pub fn query<T>(&mut self, sql: &str, args: &[&(dyn ToSql + Sync)]) -> Result<Vec<T>, Error>
    where
        T: Table,
    {
        let rows: Vec<T> = self
            .0
            .query(&sql[..], args)?
            .iter()
            .map(T::from_row)
            .collect();
        Ok(rows)
    }

    pub fn execute(&mut self, sql: &str, args: &[&(dyn ToSql + Sync)]) -> Result<(), Error> {
        self.0.execute(&sql[..], args)?;
        Ok(())
    }

    pub fn update_by<T>(
        &mut self,
        conditions: &[(&str, &(dyn ToSql + Sync))],
        update_values: &[(&str, &(dyn ToSql + Sync))],
    ) -> Result<(), Error>
    where
        T: Table,
    {
        let mut keys: Vec<&str> = vec![];
        let mut values: Vec<&(dyn ToSql + Sync)> = vec![];

        for (k, v) in update_values.iter() {
            keys.push(k);
            values.push(*v);
        }
        let set_stmt = Self::get_equations(&keys, 0).join(",");

        keys = vec![];
        for (k, v) in conditions.iter() {
            keys.push(k);
            values.push(*v);
        }
        let where_stmt = Self::get_equations(&keys, update_values.len()).join(" AND ");

        let sql = format!(
            "UPDATE {} SET {} WHERE {};",
            T::table_name(),
            set_stmt,
            where_stmt,
        );
        self.execute(&sql, &values)?;
        Ok(())
    }

    pub fn get_by_args<T>(
        &mut self,
        conditions: &[(&str, &(dyn ToSql + Sync))],
    ) -> Result<Vec<T>, Error>
    where
        T: Table,
    {
        let mut keys: Vec<&str> = vec![];
        let mut values: Vec<&(dyn ToSql + Sync)> = vec![];
        for (k, v) in conditions.iter() {
            keys.push(k);
            values.push(*v);
        }
        let where_stmt = Self::get_equations(&keys, 0).join(" AND ");
        let sql = format!("SELECT * FROM {} WHERE {};", T::table_name(), where_stmt,);
        self.query(&sql, &values)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn test() -> Result<(), Error> {
        let mut repo = Postgresql::new()?;
        let _rows: Vec<Trace> =
            repo.get_by_args(&[("name", &"aaaa"), ("workspace_id", &Uuid::new_v4())])?;

        repo.update_by::<Trace>(
            &[("name", &"aaaa"), ("workspace_id", &Uuid::new_v4())],
            &[("name", &"bbb")],
        )?;
        Ok(())
    }
}
