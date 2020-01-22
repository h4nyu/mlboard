package database

import (
    "app/pkg/model"
    "app/pkg/repository"
	"database/sql"
    "time"
	"app/pkg/interfaces/database"
    "fmt"
    "github.com/satori/go.uuid"
    // "bytes"
)


type PointRepository struct {
    conn *sql.DB
}

func NewPointRepository() repository.PointRepository {
    conn, _ := NewConn()
    repo := &PointRepository{
        conn: conn,
    }
    return repo
}

func toModels(rows database.Row) (points []model.Point) {
    for rows.Next() {
        var value float32
        var timestamp time.Time
        if err := rows.Scan(&value, &timestamp); err != nil {
            continue
        }
        point := model.Point{
            Value: value,
            Timestamp: timestamp,
        }
        points = append(points, point)
    }
    return
}

func (repo *PointRepository) All() (points []model.Point, err error) {
    rows, err := repo.conn.Query("SELECT * FROM points;")
    if err != nil {return}
    points = toModels(rows)
    return
}

func (repo *PointRepository) BulkInsert(rows []model.Point) (count int, err error) {
    txn, err := repo.conn.Begin()
    if err != nil {return}
    stmt, err := txn.Prepare("COPY points FROM STDIN WITH CSV")
    traceId := uuid.NewV4()
    if err != nil {return}
    for _, item := range rows {
        _, err = stmt.Exec(fmt.Sprintf("%s, %f,%s", item.Timestamp.Format(time.RFC3339), item.Value, traceId))
    }
    err = stmt.Close()
    txn.Commit()
    count = len(rows)
    return
}
func (repo *PointRepository) Clear() (err error) {
    _, err = repo.conn.Query("TRUNCATE TABLE points;")
    return
}
