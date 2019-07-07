import uuid
from mlboard.config import TZ
from dataclasses import field, dataclass
from datetime import datetime
from typing_extensions import Protocol
import typing as t


class Sensor:
    id: uuid.UUID
    create_date: datetime
    name: str
    unit: str
    col_name: str
    category_name: str
    log_define_id: uuid.UUID
    chamber_id: uuid.UUID
    status: int
    value: t.Optional[float]
    collect_date: t.Optional[datetime]

    def __init__(
        self,
        name: str,
        chamber_id: uuid.UUID,
        log_define_id: uuid.UUID,
        col_name: str,
        id: t.Optional[uuid.UUID] = None,
        unit: str = "",
        category_name: str = "",
        value: t.Optional[float] = None,
        collect_date: t.Optional[datetime] = None,
        status: int = 0,
        create_date: datetime = datetime.now(TZ),
    ):
        self.id = id if id is not None else uuid.uuid4()
        self.name = name
        self.status = status
        self.collect_date = collect_date
        self.value = value
        self.create_date = datetime.now(TZ)
        self.log_define_id = log_define_id
        self.chamber_id = chamber_id
        self.col_name = col_name
        self.create_date = create_date
        self.category_name = category_name
