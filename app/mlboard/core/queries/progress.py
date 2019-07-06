from .. import models as ms
import uuid
import typing as t
from ..database import IConnection
from .crud import Crud


TABLE_NAME = 'progresses'
class Progress:
    def __init__(self, conn:IConnection):
        self.conn = conn
        self.crud = Crud(
            conn,
            TABLE_NAME,
            ms.Progress,
            uuid.UUID,
        )

    async def update(self, id:uuid.UUID, **kwargs: t.Any) -> t.Optional[uuid.UUID]:
        return await self.crud.update(id, **kwargs)

    async def insert(self, obj:ms.Progress) -> t.Optional[uuid.UUID]:
        return await self.crud.insert(obj)

    async def get_by(self, **kwargs:t.Any) -> t.Optional[ms.Progress]:
        return await self.crud.get_by(**kwargs)

    async def upsert(self, obj:ms.Progress) -> t.Optional[uuid.UUID]:
        row = await self.get_by(
            config_type=obj.config_type,
            config_id=obj.config_id,
        )
        if row is None:
            return await self.insert(obj)
        else:
            ts = obj.ts if row.ts < obj.ts else row.ts
            return await self.update(
                id=row.id,
                ts=ts
            )
