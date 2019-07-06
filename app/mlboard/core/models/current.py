import uuid
from datetime import datetime
from mlboard.config import TZ
import typing as t


class Current:
    id: uuid.UUID
    create_date: datetime
    status: int
    value: t.Optional[float]
    collect_date: t.Optional[datetime]

    def __init__(
        self,
        id: uuid.UUID,
        status:int,
        value:t.Optional[float]=None,
        collect_date:t.Optional[datetime]=None,
        create_date:datetime=datetime.now(TZ)
    ) -> None:
        self.id=id
        self.value=value
        self.status=status
        self.collect_date=collect_date
        self.create_date=create_date

