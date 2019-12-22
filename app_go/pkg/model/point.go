package model

import (
	"time"
)

type Point struct {
	Value     float32
	Timestamp time.Time
}

func NewPoint() *Point {
	return &Point{
		Value:     0,
		Timestamp: time.Now(),
	}
}
