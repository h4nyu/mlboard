package model

import (
	"time"
)

type Point struct {
	Value     float32
	Timestamp time.Time
}
type Points []*Point

func NewPoint() *Point {
	return &Point{
		Value:     0,
		Timestamp: time.Now(),
	}
}
