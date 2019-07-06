from typing import Dict
import typing as t
from dataclasses import fields
from .. import models as ms
from .. import enums as es
from ..database import IConnection, IRecord
import uuid
from .crud import Crud
import typing as t
from datetime import datetime
import uuid

TABLE_NAME = 'chambers'

class Chamber:
    def __init__(self, conn:IConnection):
        self.conn = conn
        self.crud = Crud(
            conn,
            TABLE_NAME,
            ms.Chamber,
            uuid.UUID,
        )

    async def all(self) -> t.List[ms.Chamber]:
        return await self.crud.all()

    async def insert(self, obj:ms.Chamber) -> t.Optional[uuid.UUID]:
        return await self.crud.insert(obj)

    async def update(self, id:uuid.UUID, **kwargs:t.Any) -> t.Optional[uuid.UUID]:
        return await self.crud.update(id, **kwargs)

    async def delete(self) -> None:
        return await self.crud.delete()

    async def get_by(self, **kwargs:t.Any) -> t.Optional[ms.Chamber]:
        return await self.crud.get_by(**kwargs)

    async def filter_by(self, **kwargs:t.Any) -> t.List[ms.Chamber]:
        return await self.crud.filter_by(**kwargs)

    async def upsert(self, obj:ms.Chamber):
        queried_id = await self.conn.fetchval(
            f"""
                SELECT id FROM {TABLE_NAME}
                WHERE (name = $1 AND block_name = $2)
            """,
            obj.name,
            obj.block_name,
        )
        if queried_id is None:
            return await self.insert(obj)
        else:
            return await self.update(
                id=queried_id,
                name=obj.name,
                block_name=obj.block_name,
            )
