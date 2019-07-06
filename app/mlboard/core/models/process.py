from datetime import datetime
from mlboard.config import TZ
import uuid
import typing as t
from mypy_extensions import TypedDict

class Process:
    id: uuid.UUID
    create_date: datetime
    name: str
    unit: str
    state: int
    chamber_id: uuid.UUID
    log_define_id: uuid.UUID
    status: int
    value: t.Optional[float]
    collect_date: t.Optional[datetime]
    def __init__(
        self,
        name: str,
        chamber_id: uuid.UUID,
        log_define_id: uuid.UUID,
        state:int,
        id:t.Optional[uuid.UUID]=None,
        unit: str = "",
        value: t.Optional[float] = None,
        collect_date: t.Optional[datetime] = None,
        status: int = 0,
        create_date:datetime=datetime.now(TZ)
    ) -> None:
        self.id = id if id is not None else uuid.uuid4()
        self.name = name
        self.status = status
        self.collect_date = collect_date
        self.value = value
        self.create_date = datetime.now(TZ)
        self.state = state
        self.log_define_id=log_define_id
        self.chamber_id = chamber_id
        self.create_date = create_date
