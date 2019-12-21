package repository

import (
    "app/pkg/model"
)

type PointRepository interface {
	All() (model.Points, error)
}

