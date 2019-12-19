package main

import (
    "fmt"
    "testing"
    "myapp/pkg/model"
)

func TestAAA(t *testing.T) {
    p := model.NewPoint()
    fmt.Printf("%+v/n", *p)
}
