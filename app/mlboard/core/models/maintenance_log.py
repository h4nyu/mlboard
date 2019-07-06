import uuid
from mlboard.config import TZ
from dataclasses import field, dataclass
from datetime import datetime
import typing as t


class MaintenanceLog:
    id: uuid.UUID
    create_date: datetime
    maintenance_id: uuid.UUID
    occurred_date: datetime
    def __init__(
        self,
        maintenance_id:uuid.UUID,
        occurred_date:datetime,
        id:t.Optional[uuid.UUID]=None,
        create_date:datetime=datetime.now(TZ),
    ):
        self.id = id if id is not None else uuid.uuid4()
        self.create_date = create_date
        self.occurred_date = occurred_date
        self.maintenance_id=maintenance_id
