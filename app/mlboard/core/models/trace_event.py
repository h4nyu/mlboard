import uuid
from mlboard.config import TZ
from dataclasses import field, dataclass
from datetime import datetime
import typing as t
from typing_extensions import Protocol
from ..enums import TraceEventName



class TraceEvent:
    id: uuid.UUID
    config_id: uuid.UUID
    occurred_date: datetime
    name: TraceEventName
    create_date:datetime
    payload: t.Dict

    def __init__(
        self,
        name:TraceEventName,
        config_id:uuid.UUID,
        occurred_date:datetime,
        id:t.Optional[uuid.UUID]=None,
        payload:t.Optional[t.Dict]=None,
        create_date:t.Optional[datetime]=None,
    ):
        self.id = id if id is not None else uuid.uuid4()
        self.payload = payload if payload is not None else {}
        self.create_date = create_date if create_date is not None else datetime.now(TZ)
        self.occurred_date=occurred_date
        self.name = name
        self.config_id=config_id
