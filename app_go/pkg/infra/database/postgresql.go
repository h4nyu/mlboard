package database

import (
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
	"app/pkg/interfaces/database"
)

type SqlHandler struct {
	Conn *sql.DB
}

func newSqlHandler(user string, password string, host string, port int64) database.SqlHandler {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+"password=%s", host, port, user, password)
	conn, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err.Error)
	}
	sqlHandler := &SqlHandler{
		Conn: conn,
	}
	return sqlHandler
}

func NewSqlHandler() database.SqlHandler {
    return newSqlHandler("mlboard", "mlboard", "db", 5432)
}

func (handler *SqlHandler) Execute(statement string, args ...interface{}) (database.Result, error) {
	res := SqlResult{}
	result, err := handler.Conn.Exec(statement, args...)
	if err != nil {
		return res, err
	}
	res.Result = result
	return res, nil
}

func (handler *SqlHandler) Query(statement string, args ...interface{}) (database.Row, error) {
	rows, err := handler.Conn.Query(statement, args...)
	if err != nil {
		return new(SqlRow), err
	}
	row := new(SqlRow)
	row.Rows = rows
	return row, nil
}

type SqlResult struct {
	Result sql.Result
}

func (r SqlResult) LastInsertId() (int64, error) {
	return r.Result.LastInsertId()
}

func (r SqlResult) RowsAffected() (int64, error) {
	return r.Result.RowsAffected()
}

type SqlRow struct {
	Rows *sql.Rows
}

func (r SqlRow) Scan(dest ...interface{}) error {
	return r.Rows.Scan(dest...)
}

func (r SqlRow) Next() bool {
	return r.Rows.Next()
}

func (r SqlRow) Close() error {
	return r.Rows.Close()
}
