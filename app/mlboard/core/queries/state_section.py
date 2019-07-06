from cytoolz.curried import first
from .. import models as ms
from .. import db
from datetime import datetime
import uuid
from cytoolz.curried import pipe, map
from ..database import IConnection
import typing as t
from .crud import Crud


TABLE_NAME = "state_sections"
class StateSection:
    def __init__(self, conn:IConnection):
        self.conn = conn
        self.crud = Crud(
            conn,
            TABLE_NAME,
            ms.StateSection,
            uuid.UUID,
        )

    async def get_first(self, log_define_id: uuid.UUID) -> datetime:
        queried_value = await self.conn.fetchval(
            f"""
                SELECT min(from_date)
                FROM {TABLE_NAME}
                WHERE log_define_id = $1
            """,
            log_define_id
        )
        return t.cast(datetime, queried_value)

    async def bulk_insert(self, rows:t.List[ms.StateSection]) -> int:
        return await self.crud.bulk_insert(rows)

    async def range_by(self,
                       log_define_id: uuid.UUID,
                       from_date: datetime,
                       to_date: datetime,
                       ) -> t.List[ms.StateSection]:
        rows = await self.conn.fetch(
            f"""
                SELECT *
                FROM {TABLE_NAME}
                WHERE log_define_id = $1
                    AND from_date >= $2
                    AND to_date < $3
            """,
            log_define_id,
            from_date,
            to_date
        )
        return pipe(
            rows,
            map(lambda x: ms.StateSection(**x)),
            list
        )
