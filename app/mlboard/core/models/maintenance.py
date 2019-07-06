import uuid
from mlboard.config import TZ
from dataclasses import field, dataclass
from datetime import datetime
from typing_extensions import Protocol
import typing as t


class IMaintenance(Protocol):
    id: uuid.UUID
    create_date: datetime
    name: str
    chamber_id: uuid.UUID
    status:int
    collect_date: t.Optional[datetime]
    value: t.Optional[float]


class Maintenance(IMaintenance):
    def __init__(
        self,
        name:str,
        chamber_id: uuid.UUID,
        id:t.Optional[uuid.UUID]=None,
        create_date:datetime=datetime.now(TZ),
        value:t.Optional[float]=None,
        collect_date:t.Optional[datetime]=None,
        status:int=0,
    ):
        self.id = id if id is not None else uuid.uuid4()
        self.name = name
        self.create_date = create_date
        self.chamber_id = chamber_id
        self.collect_date = collect_date
        self.value=value
        self.status = status
