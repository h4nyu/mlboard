import typing as t
from uuid import UUID
from mlboard.models.protocols import IPoint
from mlboard.queries.protocols import (
    ITransaction,
    IPointQuery,
)
from mlboard.dao.postgresql import IConnection
from mlboard.queries.point import PointQuery
from datetime import datetime


class TraceUsecase:
    _transaction: ITransaction
    _point_query: IPointQuery

    def __init__(
        self,
        transaction: ITransaction,
        point_query: IPointQuery,
    ) -> None:
        self._transaction = transaction
        self._point_query = point_query

    async def register(
        self,
    ) -> None:
        ...

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
        point_query=PointQuery(conn)
    )
