package database;

import (
	"time"
    "testing"
    "app/pkg/model"
    "gotest.tools/assert"
    "github.com/google/uuid"
    "app/pkg/repository"
)

func setup(repo repository.PointRepository) {
    repo.Clear()
}

func TestAll(t *testing.T) {
    repo := NewPointRepository()
    setup(repo)

    var points []model.Point
    count := 1
    for i := 0; i < count; i++ {
        p := model.Point {
            Value: 1,
            TraceId: uuid.New(),
            Timestamp: time.Now(),
        }
        points = append(points, p)
    }
    _, err:= repo.BulkInsert(points)
    assert.Assert(t, err == nil)
    points, err = repo.All()
    assert.Assert(t, err == nil)
    t.Log(points)
    assert.Assert(t, len(points) == count)
    t.Log(err)
}
