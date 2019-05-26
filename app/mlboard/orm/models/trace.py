from dataclasses import field
import datetime
from mlboard.config import TZ
from pydantic.dataclasses import dataclass
from mlboard.config import TZ
import uuid


@dataclass
class Trace:
    id: uuid.UUID = field(default_factory=uuid.uuid4)
    name: str = ""
    experiment_id: uuid.UUID = None
    hash: uuid.UUID = field(default_factory=uuid.uuid4)
    create_date: datetime.datetime = field(default_factory=lambda:datetime.datetime.now(TZ))
    edit_date: datetime.datetime = field(default_factory=lambda:datetime.datetime.now(TZ))
    is_deleted: bool = field(default_factory=lambda:False)

    class Config:
        table_name = "traces"
