import typing as t
from uuid import UUID
from typing_extensions import Protocol
from datetime import datetime
from mlboard.models.protocols import IPoint, ITrace


ITransaction = t.AsyncContextManager[None]


class IPointQuery(Protocol):
    async def delete(self) -> None:
        ...

    async def range_by(self, trace_id: UUID, from_date: datetime, to_date: datetime) -> t.Sequence[IPoint]:
        ...

    async def bulk_insert(self, rows: t.Sequence[IPoint]) -> int:
        ...


class ITraceQuery(Protocol):
    async def all(self) -> t.Sequence[ITrace]:
        ...

    async def delete(self) -> None:
        ...

    async def upsert(self, tag: str) -> UUID:
        ...
