from uuid import UUID
from datetime import datetime


class Point:
    value: float
    ts: datetime
    trace_id: UUID

    def __init__(
        self,
        value: float,
        trace_id: UUID,
        ts: datetime,
    ):
        self.value = value
        self.ts = ts
        self.trace_id = trace_id
