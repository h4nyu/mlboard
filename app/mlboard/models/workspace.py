import typing as t
from uuid import UUID, uuid4
from datetime import datetime


class Workspace:
    id: UUID
    name: str
    params: dict
    created_at: datetime

    def __init__(
        self,
        name: str,
        params: t.Dict[str, t.Any] = {},
        created_at: t.Union[datetime, None] = None,
        id: t.Union[UUID, None] = None,
    ) -> None:
        self.id = id if id is not None else uuid4()
        self.created_at = created_at if created_at is not None else datetime.now()
        self.name = name
        self.params = params
