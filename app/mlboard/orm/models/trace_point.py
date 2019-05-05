from dataclasses import field, dataclass
import uuid
from mlboard.config import TZ
import datetime


@dataclass
class TracePoint:
    id: uuid.UUID = field(default_factory=uuid.uuid4)
    trace_id: uuid.UUID = None
    x: float = None
    y: float = None
    ts: datetime.datetime = field(default_factory=lambda:datetime.datetime.now(TZ))
    class Config:
        table_name = "trace_points"
