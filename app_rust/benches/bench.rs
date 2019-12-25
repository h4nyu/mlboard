use criterion::{
    black_box, 
    criterion_group, 
    criterion_main, 
    Criterion
};
use chrono::prelude::{Utc, DateTime};
use uuid::Uuid;
use app::infra::database::{bulk_insert};
use app::models::{Point};
use std::time::{Duration};

fn criterion_benchmark(c: &mut Criterion) {
    let trace_id = Uuid::new_v4();
    let rows = (0..=100000)
        .map(|x| Point{
            value:x as f64,
            ts: Utc::now(),
            trace_id: trace_id,
        })
    .collect::<Vec<Point>>();
    c.bench_function("bulk insert", |b| b.iter(|| bulk_insert(&rows)));
}

criterion_group!{
    name = benches;
    config = Criterion::default()
        .sample_size(10)
        .measurement_time(Duration::from_secs_f32(1.0));
    targets = criterion_benchmark
}
criterion_main!(benches);
