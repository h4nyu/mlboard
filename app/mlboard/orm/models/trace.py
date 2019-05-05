from dataclasses import field
from pydantic.dataclasses import dataclass
import uuid


@dataclass
class Trace:
    id: uuid.UUID = field(default_factory=uuid.uuid4)
    name: str = ""
    experiment_id: uuid.UUID = None

    class Config:
        table_name = "traces"
