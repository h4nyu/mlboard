package database

import (
    "app/pkg/model"
    "app/pkg/repository"
	"database/sql"
    "github.com/lib/pq"
    "github.com/google/uuid"
    "time"
	"app/pkg/interfaces/database"
    "fmt"
)


type PointRepository struct {
    conn *sql.DB
}
const TABLE_NAME = "points"
var COLUMNS = []string{"aaa", "bbb"}

func NewPointRepository() repository.PointRepository {
    conn, _ := NewConn()
    repo := &PointRepository{
        conn: conn,
    }
    return repo
}

func toModels(rows database.Row) (points []model.Point) {
    for rows.Next() {
        fmt.Printf("%v", rows)
        var value float32
        var timestamp time.Time
        var traceId uuid.UUID
        point := model.Point{
            Value: value,
            Timestamp: timestamp,
            TraceId: traceId,
        }
        err := rows.Scan(
            &point.Value,
            &point.Timestamp,
            &point.TraceId,
        )
        fmt.Printf("%v", err)
        points = append(points, point)
    }
    return
}

func (repo *PointRepository) All() (points []model.Point, err error) {
    rows, err := repo.conn.Query(fmt.Sprintf("SELECT * FROM %s;", TABLE_NAME))
    if err != nil {return}
    points = toModels(rows)
    return
}

func (repo *PointRepository) BulkInsert(rows []model.Point) (count int, err error) {
    txn, err := repo.conn.Begin()
    if err != nil {return}
    stmt, err := txn.Prepare(pq.CopyIn("points", "value", "ts", "trace_id"))
    if err != nil {return}
    for _, item := range rows {
        stmt.Exec(item.Value, item.Timestamp, item.TraceId)
    }
    err = stmt.Close()
    txn.Commit()
    count = 0
    return
}

func (repo *PointRepository) Clear() (err error) {
    _, err = repo.conn.Query("TRUNCATE TABLE points;");
    return
}
