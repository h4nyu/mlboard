from cytoolz.curried import pipe, map, take, first, concat, filter, sorted, unique, reduce
from .. import models as ms
from ..database import IConnection
from .crud import Crud
import typing as t
import uuid


TABLE_NAME = 'processes'
class Process:
    def __init__(self, conn:IConnection):
        self.conn = conn
        self.crud = Crud(
            conn,
            TABLE_NAME,
            ms.Process,
            uuid.UUID,
        )

    async def all(self) -> t.List[ms.Process]:
        return await self.crud.all()

    async def insert(self, obj:ms.Process) -> t.Optional[uuid.UUID]:
        return await self.crud.insert(obj)

    async def update(self, id:uuid.UUID, **kwargs) -> t.Optional[uuid.UUID]:
        return await self.crud.update(id, **kwargs)

    async def delete(self) -> None:
        return await self.crud.delete()

    async def filter_by(self, **kwargs:t.Any) -> t.List[ms.Process]:
        return await self.crud.filter_by(**kwargs)

    async def upsert(self, obj: ms.Process) -> t.Optional[uuid.UUID]:
        queried_id = await self.conn.fetchval(
            f"""
                SELECT id
                FROM {TABLE_NAME}
                WHERE state = $1 AND log_define_id = $2 OR id = $3
            """,
            obj.state,
            obj.log_define_id,
            obj.id,
        )
        if queried_id is None:
            queried_id = await self.insert(obj)

        return queried_id
