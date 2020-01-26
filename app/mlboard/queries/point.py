from uuid import UUID
import typing as t
from datetime import datetime
from mlboard.models.protocols import IPoint
from mlboard.models.point import Point
from mlboard.infra.db.protocols import IConnection
from .model import ModelQuery


class PointQuery(ModelQuery[IPoint, UUID]):
    def __init__(self, conn: IConnection) -> None:
        super().__init__(
            conn=conn,
            table_name='points',
            to_model=lambda x: Point(
                value=x['value'],
                trace_id=x['trace_id'],
                ts=x['ts'],
            )
        )

    async def range_by_limit(
        self,
        trace_id: UUID,
        limit: int = 10000,
    ) -> t.Sequence[IPoint]:
        rows = await self.conn.fetch(
            f"""
                SELECT value, ts
                FROM {self.table_name}
                WHERE trace_id = $1
                ORDER BY ts DESC
                LIMIT $2
            """,
            trace_id,
            limit,
        )

        return [
            Point(
                value=r['value'],
                trace_id=trace_id,
                ts=r['ts'],
            )
            for r
            in rows
        ]

    async def range_by(
        self,
        trace_id: UUID,
        from_date: datetime,
        to_date: datetime,
    ) -> t.Sequence[IPoint]:
        rows = await self.conn.fetch(
            f"""
                SELECT value, ts
                FROM {self.table_name}
                WHERE trace_id = $1
                    AND ts BETWEEN $2 AND $3
                ORDER BY ts ASC
            """,
            trace_id,
            from_date,
            to_date,
        )
        return [
            Point(
                value=r['value'],
                trace_id=trace_id,
                ts=r['ts'],
            )
            for r
            in rows
        ]

    async def bulk_insert(self, rows: t.Sequence[IPoint]) -> int:
        conn = self.conn
        if len(rows) > 0:
            records = [
                (x.ts, x.value, x.trace_id)
                for x
                in rows
            ]
            await conn.copy_records_to_table(
                self.table_name,
                columns=['ts', 'value', 'trace_id'],
                records=records
            )
        return len(rows)
