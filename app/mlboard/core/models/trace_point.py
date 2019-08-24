import uuid
import typing
from dataclasses import dataclass
from typing_extensions import Protocol
from datetime import datetime


class TracePoint:
    value: float
    ts: datetime
    tag: str

    def __init__(
        self,
        value: float,
        tag: str,
        ts: datetime,
    ):
        self.value = value
        self.ts = ts
        self.tag = tag
