from dataclasses import field, dataclass
from mlboard.config import TZ
from datetime import datetime
import uuid
import typing as t


class TraceLevel:
    id: uuid.UUID
    create_date: datetime
    warning_level: float
    error_level: float

    def __init__(
        self,
        warning_level:float=0,
        error_level:float=0,
        id:t.Optional[uuid.UUID]=None,
        create_date:datetime=datetime.now(TZ),
    ):
        self.id = id if id is not None else uuid.uuid4()
        self.warning_level=warning_level
        self.error_level=error_level
        self.create_date=create_date

