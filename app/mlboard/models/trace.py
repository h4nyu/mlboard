import typing as t
from uuid import UUID, uuid4
from datetime import datetime


class Trace:
    id: UUID
    tag: str
    created_at: datetime
    updated_at: datetime

    def __init__(
        self,
        tag: str,
        created_at: t.Union[datetime, None] = None,
        updated_at: t.Union[datetime, None] = None,
        id: t.Union[UUID, None] = None,
        workspace_id: t.Union[UUID, None] = None,
    ) -> None:
        self.id = id if id is not None else uuid4()
        self.workspace_id = workspace_id if workspace_id is not None else uuid4()
        self.created_at = created_at if created_at is not None else datetime.now()
        self.updated_at = updated_at if updated_at is not None else datetime.now()
        self.tag = tag
