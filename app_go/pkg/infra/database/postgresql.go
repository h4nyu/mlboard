package database

import (
    "database/sql"
    _ "github.com/lib/pq"
    "fmt"
)

func newConn(user string, password string, host string, port int64) (conn *sql.DB, err error) {
    psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+"password=%s sslmode=disable", host, port, user, password)
    conn, err = sql.Open("postgres", psqlInfo)
    return
}
//
func NewConn() (conn *sql.DB, err error) {
    return newConn("mlboard", "mlboard", "db", 5432)
}
