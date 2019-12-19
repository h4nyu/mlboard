package main

import (
    "testing"
    "fmt"
    "myapp/pkg/infra/database"
)

func TestExecute(t *testing.T) {
    db := database.NewSqlHandler("mlboard", "mlboard", "db", 5432, "public")
    res, err := db.Execute("SELECT ")
    fmt.Printf("%+v/n", res)
    fmt.Printf("%+v/n", err)
}
