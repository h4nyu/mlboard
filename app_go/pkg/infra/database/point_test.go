package database;

import (
    "testing"
)

func TestAll(t *testing.T) {
    repo := NewPointRepository()
    res, _:= repo.All()
    t.Log(res)
}

func TestBulkInsert(t *testing.T) {
    repo := NewPointRepository()
    res, _:= repo.All()
    t.Log(res)
}
