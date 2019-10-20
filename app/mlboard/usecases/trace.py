import typing as t
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

    async def range_by(
        self,
        tag: str,
        from_date: datetime,
        to_date: datetime,
    ) -> t.Sequence[IPoint]:
        return await self._point_query.range_by(
            tag=tag,
            from_date=from_date,
            to_date=to_date,
        )

def create_usecase(conn:IConnection) -> TraceUsecase:
    return TraceUsecase(
        transaction=conn.transaction(),
        point_query=PointQuery(conn)
    )

