package database;

import (
    "testing"
    "gotest.tools/assert"
    "app/pkg/model"
)

func TestAll(t *testing.T) {
    repo := NewPointRepository()
    var points []model.Point
    for i := 0; i < 100; i++ {
        points = append(points, *model.NewPoint())
    }
    count, err:= repo.BulkInsert(points)
    assert.Assert(t, err == nil)
    assert.Assert(t, count == 100)
}

func TestClear(t *testing.T) {
    repo := NewPointRepository()
    err:= repo.Clear()
    assert.Assert(t, err == nil)
}
