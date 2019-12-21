package database

import (
    "app/pkg/model"
    "app/pkg/repository"
    "time"
	"app/pkg/interfaces/database"
)


type PointRepository struct {
    database.SqlHandler
}

func NewPointRepository() repository.PointRepository {
    repo := &PointRepository{
        SqlHandler: NewSqlHandler(),
    }
    return repo
}

func toModels(rows database.Row) (points model.Points) {
    for rows.Next() {
        var value float32
        var timestamp time.Time
        if err := rows.Scan(&value, &timestamp); err != nil {
            continue
        }
        point := &model.Point{
            Value: value,
            Timestamp: timestamp,
        }
        points = append(points, point)
    }
    return
}

func (repo *PointRepository) All() (points model.Points, err error) {
    rows, err := repo.Query("SELECT * FROM points;")
    if err != nil {return}
    points = toModels(rows)
    return
}

func (repo *PointRepository) BulkInsert() (points model.Points, err error) {
    rows, err := repo.Query("SELECT * FROM points;")
    if err != nil {return}
    points = toModels(rows)
    return
}
