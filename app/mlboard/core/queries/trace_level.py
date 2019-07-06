from toolz.curried import pipe, map, take, first, concat, filter, sorted, unique
from .. import models as ms
import asyncio
import uuid
import typing as t
from ..database import IConnection, IRecord
from .crud import Crud

TABLE_NAME = 'trace_levels'
class TraceLevel:
    def __init__(self, conn:IConnection):
        self.conn = conn
        self.crud = Crud(
            conn,
            TABLE_NAME,
            ms.TraceLevel,
            uuid.UUID,
        )


    async def all(self) -> t.List[ms.TraceLevel]:
        return await self.crud.all()


    async def get_by(self, **kwargs: t.Any) -> t.Optional[ms.TraceLevel]:
        return await self.crud.get_by(**kwargs)

    async def update(self, id:uuid.UUID, **kwargs: t.Any) -> t.Optional[uuid.UUID]:
        return await self.crud.update(id, **kwargs)

    async def insert(self, obj:ms.TraceLevel) -> t.Optional[uuid.UUID]:
        return await self.crud.insert(obj)

    async def delete(self) -> None:
        return await self.crud.delete()

    async def delete_by(self, **kwargs:t.Any) -> None:
        return await self.crud.delete_by(**kwargs)

    async def upsert(self, obj) -> t.Optional[uuid.UUID]:
        matched_ids = await self.conn.fetch(
            f"""
                SELECT id FROM (
                    SELECT id FROM sensors WHERE id = $1
                    UNION
                    SELECT id FROM processes WHERE id = $1
                    UNION
                    SELECT id FROM maintenances WHERE id = $1
                ) AS t
            """,
            obj.id,
        )
        is_exist = any(matched_ids)
        if not is_exist:
            raise Exception("Parent id not exist")

        queried_id = await self.conn.fetchval(
            f"""
                SELECT id
                FROM {TABLE_NAME}
                WHERE id = $1
            """,
            obj.id,
        )
        if queried_id is None:
            queried_id = await self.insert(obj)
        else:
            queried_id = await self.update(
                id=queried_id,
                warning_level=obj.warning_level,
                error_level=obj.error_level,
            )
        return queried_id
