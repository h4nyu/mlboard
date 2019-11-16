import typing as t
from uuid import UUID
from mlboard.models.protocols import IPoint
from mlboard.queries.protocols import (
    IPointQuery,
    ITransaction,
    ITraceQuery,
)
from mlboard.models.point import Point
from mlboard.config import TZ
from datetime import datetime


class PointUsecase:
    def __init__(
        self,
        transaction: ITransaction,
        point_query: IPointQuery,
        trace_query: ITraceQuery,
    ) -> None:
        self.transaction = transaction
        self.point_query = point_query
        self.trace_query = trace_query

    async def update_last_date(
        self,
        trace_ids: t.Sequence[UUID],
        last_ts: datetime,
    ) -> None:
        await self.trace_query.update(
            keys=trace_ids,
            payload={'updated_at': last_ts}
        )

    async def add_scalar(
        self,
        trace_id: UUID,
        value: float,
        ts: t.Optional[datetime] = None,
    ) -> None:
        ts = ts if ts is not None else datetime.now(TZ)
        point = Point(
            trace_id=trace_id,
            value=value,
            ts=ts,
        )
        await self.point_query.bulk_insert([point])
        await self.update_last_date([trace_id], ts)

    async def range_by(
        self,
        trace_id: UUID,
        from_date: datetime,
        to_date: datetime,
    ) -> t.Sequence[IPoint]:
        return await self.point_query.range_by(
            trace_id,
            from_date,
            to_date
        )

    async def filter_by_limit(
        self,
        trace_id: UUID,
        limit: int = 10000,
    ) -> t.Sequence[IPoint]:
        return await self.point_query.range_by_limit(
            trace_id,
            limit
        )

    async def add_scalars(
        self,
        values: t.Dict[UUID, float],
        ts: t.Optional[datetime] = None,
    ) -> None:
        ts = ts if ts is not None else datetime.now(TZ)
        points = [
            Point(
                trace_id=x,
                value=y,
                ts=ts,
            )
            for x, y
            in values.items()
        ]
        await self.point_query.bulk_insert(points)
        await self.update_last_date(list(values.keys()), ts)
