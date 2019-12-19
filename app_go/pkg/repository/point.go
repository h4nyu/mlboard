package repository

import (
	"myapp/pkg/model"
)

type PointRepository interface {
	All() ([]*model.Point, error)
}
