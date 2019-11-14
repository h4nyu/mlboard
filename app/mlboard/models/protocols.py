import typing as t
from uuid import UUID
from datetime import datetime


class IPoint(t.Protocol):
    value: float
    ts: datetime
    trace_id: UUID


class ITrace(t.Protocol):
    id: UUID
    name: str
    created_at: datetime
    updated_at: datetime


class IWorkspace(t.Protocol):
    id: UUID
    name: str
    params: dict
    created_at: datetime
