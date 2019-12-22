package database;

import (
    "testing"
    "app/pkg/model"
    "time"
)

func TestAll(t *testing.T) {
    start := time.Now()
    repo := NewPointRepository()
    var points []*model.Point
    for i := 0; i < 1000000; i++ {
        points = append(points, model.NewPoint())
    }
    elapsed := time.Since(start)
    t.Log(elapsed)
    _, err:= repo.BulkInsert(points)
    elapsed = time.Since(start)
    t.Log(elapsed)
    t.Log(err)
}
