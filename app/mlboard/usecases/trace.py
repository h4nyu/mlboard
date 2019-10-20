import typing as t
from uuid import UUID
from mlboard.models.protocols import IPoint
from mlboard.queries.protocols import (
    ITransaction,
    IPointQuery,
    ITraceQuery,
)
from mlboard.dao.postgresql import IConnection
from mlboard.queries.point import PointQuery
from mlboard.queries.trace import TraceQuery
from mlboard.models.point import Point
from mlboard.models.trace import Trace
from datetime import datetime


class TraceUsecase:
    _transaction: ITransaction
    _point_query: IPointQuery
    _trace_query: ITraceQuery

    def __init__(
        self,
        transaction: ITransaction,
        point_query: IPointQuery,
        trace_query: ITraceQuery,
    ) -> None:
        self._transaction = transaction
        self._point_query = point_query
        self._trace_query = trace_query

    async def register_trace(
        self,
        tag: str,
    ) -> UUID:
        return await self._trace_query.upsert(tag)

    async def delete_trace(
        self,
        tag_id: str,
    ) -> None:
        ...

    async def add_scalar(
        self,
        trace_id: UUID,
        value: float,
        ts: datetime,
    ) -> int:
        point = Point(
            trace_id=trace_id,
            value=value,
            ts=ts,
        )
        return await self._point_query.bulk_insert([point])

    async def range_by(
        self,
        trace_id: UUID,
        from_date: datetime,
        to_date: datetime,
    ) -> t.Sequence[IPoint]:
        return await self._point_query.range_by(
            trace_id=trace_id,
            from_date=from_date,
            to_date=to_date,
        )


def create_usecase(conn: IConnection) -> TraceUsecase:
    return TraceUsecase(
        transaction=conn.transaction(),
        point_query=PointQuery(conn),
        trace_query=TraceQuery(conn),
    )
