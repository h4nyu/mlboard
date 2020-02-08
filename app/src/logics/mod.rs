use crate::domain::entities::SlimPoint;

pub fn reduce_points(points: &[SlimPoint], size: usize) -> Vec<SlimPoint> {
    if size == 0 {
        return vec![];
    }
    let window_size = points.len() / size;
    if window_size == 0 {
        return points.to_vec();
    }

    let mut res: Vec<SlimPoint> = vec![];
    for i in 0..size {
        let window_last = &points[(i + 1) * window_size - 1];
        res.push(SlimPoint {
            value: window_last.value.to_owned(),
            ts: window_last.ts.to_owned(),
        });
    }
    res
}

#[cfg(test)]
mod tests {
    use super::*;
    use chrono::prelude::Utc;

    #[test]
    fn test_reduce_points() -> () {
        let points: Vec<SlimPoint> = (0..7)
            .map(|x| SlimPoint {
                value: x as f64,
                ts: Utc::now(),
            })
            .collect();
        let res = reduce_points(&points[..], 2);
        assert_eq!(res.len(), 3);
    }
}
