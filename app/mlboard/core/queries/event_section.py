from cytoolz.curried import map, pipe
from .. import models as ms
from datetime import datetime
import uuid
import typing as t
from ..database import IConnection, IRecord
from .crud import Crud


TABLE_NAME = 'event_sections'
class EventSection:

    def __init__(self, conn:IConnection):
        self.conn = conn
        self.crud = Crud(
            conn,
            TABLE_NAME,
            ms.EventSection,
            uuid.UUID,
        )


    async def delete(self) -> None:
        return await self.crud.delete()

    async def bulk_insert(self, rows:t.List[ms.EventSection]) -> int:
        return await self.crud.bulk_insert(rows)


    async def range_by(self, from_date, to_date, chamber_ids=[]) -> t.Sequence[ms.EventSection]:
        rows = await self.conn.fetch(
            f"""
                SELECT * FROM {TABLE_NAME}
                WHERE chamber_id = ANY($3::uuid[])
                    AND from_date >= $1
                    AND to_date < $2
            """,
            from_date,
            to_date,
            chamber_ids,
        )
        return self.crud.to_models(rows)
