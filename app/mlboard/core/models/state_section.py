import uuid
from typing_extensions import Protocol
from datetime import datetime
import typing as t



class IStateSection(Protocol):
    id: uuid.UUID
    log_define_id: uuid.UUID
    state: int
    from_date: datetime
    to_date: datetime


class StateSection(IStateSection):
    def __init__(
        self,
        log_define_id:uuid.UUID,
        state:int,
        from_date:datetime,
        to_date:datetime,
        id:t.Optional[uuid.UUID]=None,
    ):
        self.id = id if id is not None else uuid.uuid4()
        self.log_define_id = log_define_id
        self.from_date = from_date
        self.to_date = to_date
        self.state = state

