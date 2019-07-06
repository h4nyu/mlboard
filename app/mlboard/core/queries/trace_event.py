from cytoolz.curried import map, pipe
from .. import models as ms
from datetime import datetime
from ..database import IConnection, IRecord
import uuid
from .crud import Crud
import typing as t


TABLE_NAME = 'trace_events'
class TraceEvent:
    def __init__(self, conn:IConnection):
        self.conn = conn
        self.crud = Crud(
            conn,
            TABLE_NAME,
            ms.TraceEvent,
            uuid.UUID,
        )
    async def delete(self) -> None:
        return await self.crud.delete()

    async def bulk_insert(self, rows:t.List[ms.TraceEvent]) -> int:
        for r in rows:
            await self.crud.insert(r)
        return len(rows)

    async def range_by(
        self,
        from_date:datetime,
        to_date:datetime,
        chamber_ids:t.List[uuid.UUID]=[],
    ) -> t.List[ms.TraceEvent]:
        rows = await self.conn.fetch(
            f"""
                SELECT te.id, te.create_date, te.occurred_date, te.config_id, te.name, te.payload
                    FROM {TABLE_NAME} as te
                    JOIN processes as ps on ps.id = te.config_id
                    WHERE ps.chamber_id = any($3::uuid[])
                    AND occurred_date >= $1 AND occurred_date < $2
                UNION ALL
                SELECT te.id, te.create_date, te.occurred_date, te.config_id, te.name, te.payload
                    FROM public.trace_events as te
                    JOIN sensors as ss on ss.id = te.config_id
                    WHERE ss.chamber_id = any($3::uuid[])
                    AND occurred_date >= $1 AND occurred_date < $2
            """,
            from_date,
            to_date,
            chamber_ids
        )
        return self.crud.to_models(rows)
