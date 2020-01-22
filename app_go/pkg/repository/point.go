package repository

import (
    "app/pkg/model"
)

type PointRepository interface {
	All() ([]model.Point, error)
    BulkInsert(rows []model.Point) (int, error)
    Clear() (error)
}
