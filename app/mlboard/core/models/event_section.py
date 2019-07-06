import uuid
from mlboard.config import TZ
from dataclasses import field, dataclass
from typing_extensions import Protocol
from datetime import datetime
import typing as t

class EventSection:
    id: uuid.UUID
    from_date: datetime
    to_date: datetime
    code: int
    message: str
    status: int
    chamber_id: uuid.UUID
    substract_id: str

    def __init__(
        self,
        from_date:datetime,
        to_date:datetime,
        code:int,
        status:int,
        chamber_id:uuid.UUID,
        substract_id:str ="",
        message:str = "",
        id:t.Optional[uuid.UUID]=None,
    ):
        self.id = uuid.uuid4() if id is None else id
        self.from_date = from_date
        self.to_date = to_date
        self.code = code
        self.message = message
        self.status = status
        self.chamber_id = chamber_id
        self.substract_id = substract_id
