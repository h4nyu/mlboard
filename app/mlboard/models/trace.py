import typing as t
from uuid import UUID, uuid4
from datetime import datetime


class Trace:
    id: UUID
    tag: str

    def __init__(
        self,
        tag: str,
        id: t.Union[UUID, None] = None,
    ) -> None:
        self.id = id if id is not None else uuid4()
        self.tag = tag
