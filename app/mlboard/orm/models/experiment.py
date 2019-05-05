import typing
from mlboard.config import TZ
import datetime
from dataclasses import field
from pydantic.dataclasses import dataclass
import uuid


@dataclass
class Experiment:
    id: uuid.UUID = field(default_factory=uuid.uuid4)
    name: str = ""
    memo: str = ""
    score: typing.Optional[float] = None
    config: dict = field(default_factory=dict)
    hash: uuid.UUID = field(default_factory=uuid.uuid4)
    create_date: datetime.datetime = field(default_factory=lambda:datetime.datetime.now(TZ))
    edit_date: datetime.datetime = field(default_factory=lambda:datetime.datetime.now(TZ))
    is_deleted: bool = field(default_factory=lambda:False)

    class Config:
        table_name = "experiments"
