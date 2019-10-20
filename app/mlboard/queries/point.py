from cytoolz.curried import map, pipe
from uuid import UUID, uuid4
import time
from logging import getLogger
import typing as t
from profilehooks import profile
from datetime import datetime
from mlboard.models.protocols import IPoint
from mlboard.models.point import Point
from mlboard.dao.protocols import IQuery
from mlboard.dao.postgresql import PostgresqlQuery, IConnection


logger = getLogger("api.query.trace")


TABLE_NAME = "points"


def create_model(row: t.Dict[str, t.Any]) -> IPoint:
    return Point(
        value=row['value'],
        trace_id=row['trace_id'],
        ts=row['ts'],
    )


class PointQuery:
    def __init__(self, conn: IConnection) -> None:
        self._query: IQuery[IPoint, str] = PostgresqlQuery[IPoint, str](
            conn,
            TABLE_NAME,
            create_model,
        )

    async def delete(self) -> None:
        return await self._query.delete()

    async def range_by(
        self,
        trace_id: UUID,
        from_date: datetime,
        to_date: datetime,
        limit: int = 10000,
    ) -> t.Sequence[IPoint]:
        rows = await self._query.conn.fetch(
            f"""
                SELECT value, ts
                FROM {TABLE_NAME}
                WHERE trace_id = $1
                    AND ts BETWEEN $2 AND $3
                ORDER BY ts ASC
                LIMIT $4
            """,
            trace_id,
            from_date,
            to_date,
            limit,
        )
        return [
            Point(
                trace_id=trace_id,
                value=rows['value'],
                ts=rows['ts'],
            )
            for r
            in rows
        ]

    async def bulk_insert(self, rows: t.Sequence[IPoint]) -> int:
        conn = self._query.conn
        if len(rows) > 0:
            records = pipe(
                rows,
                map(lambda x: (x.ts, x.value, x.trace_id)),
                list
            )
            await conn.copy_records_to_table(
                TABLE_NAME,
                columns=['ts', 'value', 'trace_id'],
                records=records
            )
        return len(rows)