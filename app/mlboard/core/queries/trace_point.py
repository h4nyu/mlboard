from cytoolz.curried import map, pipe
from .. import models as ms
from .. import db
import uuid
import time
from logging import getLogger
import typing as t
from profilehooks import profile
from datetime import datetime
from mlboard.dao.protocols import IQuery
from mlboard.dao.postgresql import PostgresqlQuery, IConnection


logger = getLogger("api.query.trace")


TABLE_NAME = "trace_points"


def create_model(row: t.Dict[str, t.Any]) -> ms.TracePoint:
    return ms.TracePoint(
        value=row['value'],
        tag=row['tag'],
        ts=row['ts'],
    )


class TracePoint:
    def __init__(self, conn: IConnection) -> None:
        self._query: IQuery[ms.TracePoint, str] = PostgresqlQuery[ms.TracePoint, str](
            conn,
            TABLE_NAME,
            create_model,
        )

    async def delete(self) -> None:
        return await self._query.delete()

    async def range_by(
        self,
        tag: str,
        from_date: datetime,
        to_date: datetime,
        limit: int = 10000,
    ) -> t.List[ms.TracePoint]:
        rows = await self._query.conn.fetch(
            f"""
                SELECT value, ts
                FROM {TABLE_NAME}
                WHERE tag = $1
                    AND ts BETWEEN $2 AND $3
                ORDER BY ts ASC
                LIMIT $4
            """,
            tag,
            from_date,
            to_date,
            limit,
        )
        return [
            ms.TracePoint(
                tag=tag,
                value=rows['value'],
                ts=rows['ts'],
            )
            for r
            in rows
        ]

    async def bulk_insert(self, objects) -> int:
        conn = self._query.conn
        if len(objects) > 0:
            records = pipe(
                objects,
                map(lambda x: (x.ts, x.value, x.tag)),
                list
            )
            await conn.copy_records_to_table(
                TABLE_NAME,
                columns=['ts', 'value', 'tag'],
                records=records
            )
        count = len(objects)
        return count
