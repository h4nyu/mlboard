import typing as t
from uuid import UUID
from mlboard.models.protocols import IPoint
from mlboard.queries.protocols import (
    ITransaction,
    IPointQuery,
    ITraceQuery,
)
from mlboard.dao.postgresql import Connection, IConnection
from mlboard.queries.point import PointQuery
from mlboard.queries.trace import TraceQuery
from mlboard.models.point import Point
from mlboard.models.trace import Trace
from mlboard.models.protocols import ITrace
from mlboard.config import DB_CONN, TZ
from datetime import datetime
from .protocols import IPointUsecase


def create_usecase() -> IPointUsecase:
    return PointUsecase(
        get_conn=lambda: Connection(DB_CONN),
        point_query=lambda x: PointQuery(x),
    )


class PointUsecase:
    def __init__(
        self,
        get_conn: t.Callable[[], Connection],
        point_query=t.Callable[[IConnection], IPointQuery],
    ) -> None:
        self.get_conn = get_conn
        self.point_query = point_query

    async def add_scalar(
        self,
        trace_id: UUID,
        value: float,
    ) -> None:
        point = Point(
            trace_id=trace_id,
            value=value,
            ts=datetime.now(TZ),
        )
        async with self.get_conn() as conn:
            await self.point_query(conn).bulk_insert([point])

    async def range_by(
        self,
        trace_id: UUID,
        from_date: datetime,
        to_date: datetime,
    ) -> t.Sequence[IPoint]:
        async with self.get_conn() as conn:
            return await self.point_query(conn).range_by(
                trace_id,
                from_date,
                to_date
            )
