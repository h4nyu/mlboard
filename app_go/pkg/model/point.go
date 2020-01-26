package model

import (
	"time"
    "github.com/google/uuid"
)

type Point struct {
	Value     float32
    TraceId uuid.UUID
	Timestamp time.Time
}
