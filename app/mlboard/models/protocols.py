from typing_extensions import Protocol
from datetime import datetime

class IPoint(Protocol):
    value: float
    ts: datetime
    tag: str

