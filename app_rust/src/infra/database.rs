use chrono::prelude::{Utc, DateTime};
use postgres::{Connection, TlsMode};
use serde::{Serialize, Deserialize};
use uuid::Uuid;
use rayon::prelude::*;
use crate::models::{Point};


pub fn all() {
    let conn = match Connection::connect("postgresql://mlboard:mlboard@db/mlboard", TlsMode::None) {
        Ok(x) => x, Err(e) => return,
    };

    for row in &conn.query("SELECT value FROM points", &[]).unwrap() {
    }
}


pub fn bulk_insert(rows: &[Point]) {
    let conn = Connection::connect("postgresql://mlboard:mlboard@db/mlboard", TlsMode::None).unwrap();
    let stmt = conn.prepare("COPY points FROM STDIN WITH CSV").unwrap();
    let data = rows.par_iter()
        .map(|x| {
            format!("{ts},{value},{trace_id}\n",
                    ts=x.ts,
                    value=x.value,
                    trace_id=&x.trace_id)
        })
        .collect::<Vec<String>>()
        .join("");
    stmt.copy_in(&[], &mut data.as_bytes()).unwrap();
}

#[cfg(test)]
mod tests {
    // Note this useful idiom: importing names from outer (for mod tests) scope.
    use super::*;

    #[test]
    fn test_all() {
        let trace_id = Uuid::new_v4();
        let rows = (0..=100000)
            .map(|x| Point{
                value:x as f64,
                ts: Utc::now(),
                trace_id: trace_id,
            })
        .collect::<Vec<Point>>();
        bulk_insert(&rows);
    }
}

