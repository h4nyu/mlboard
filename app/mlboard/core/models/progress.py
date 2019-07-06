import uuid
from datetime import datetime
from mlboard.config import TZ
from dataclasses import field, dataclass
import typing as t


class Progress:
    id: uuid.UUID
    create_date: datetime
    ts: datetime
    config_id: uuid.UUID
    config_type: str

    def __init__(
        self,
        ts:datetime,
        config_id: uuid.UUID,
        config_type: str,
        id:t.Optional[uuid.UUID]=None,
        create_date:datetime=datetime.now(TZ)
    ):
        self.id = id if id is not None else uuid.uuid4()
        self.ts = ts
        self.config_id = config_id
        self.config_type = config_type
        self.create_date = create_date
