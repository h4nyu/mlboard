import typing as t
from uuid import UUID
from typing_extensions import Protocol
from datetime import datetime
from mlboard.models.protocols import IPoint
from mlboard.queries.protocols import IPointQuery


class ITraceUsecase(Protocol):
    async def range_by(self, trace_id: UUID, from_date: datetime, to_date: datetime) -> t.Sequence[IPoint]:
        ...


class IRoot(Protocol):
    point: IPointQuery
