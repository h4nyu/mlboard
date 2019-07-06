from dataclasses import field, dataclass
import uuid
import typing
from datetime import datetime
from mlboard.config import TZ
import typing as t

class Chamber:
    id: uuid.UUID
    create_date: datetime
    block_name: str
    name: str
    status: int
    warning_count: int
    error_count: int
    value: t.Optional[float]
    collect_date: t.Optional[datetime]
    def __init__(
        self,
        name: str,
        id: t.Optional[uuid.UUID]=None,
        status: int = 0,
        warning_count: int = 0,
        error_count: int = 0,
        collect_date:t.Optional[datetime] = None,
        value:t.Optional[float] = None,
        block_name:str="",
        create_date:datetime=datetime.now(TZ),
    ):
        self.id = id if id is not None else uuid.uuid4()
        self.create_date = create_date
        self.block_name = block_name
        self.status = status
        self.warning_count = warning_count
        self.error_count = error_count
        self.collect_date = collect_date
        self.value=value
        self.name=name
