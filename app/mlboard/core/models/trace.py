import uuid
import typing
from dataclasses import dataclass
from typing_extensions import Protocol
from datetime import datetime


class Trace:
    value: float
    ts: datetime
    config_id: uuid.UUID

    def __init__(
        self,
        value: float,
        config_id: uuid.UUID,
        ts: datetime,
    ):
        self.value = value
        self.ts = ts
        self.config_id = config_id
