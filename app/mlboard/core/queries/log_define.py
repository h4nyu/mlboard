from .. import models as ms
from ..database import IConnection
import uuid
from .crud import Crud
import typing as t


TABLE_NAME = 'log_defines'
class LogDefine:
    def __init__(self, conn:IConnection):
        self.conn = conn
        self.crud = Crud(
            conn,
            TABLE_NAME,
            ms.LogDefine,
            uuid.UUID,
        )

    async def all(self)-> t.List[ms.LogDefine]:
        return await self.crud.all()

    async def insert(self, obj:ms.LogDefine)-> t.Optional[uuid.UUID]:
        return await self.crud.insert(obj)

    async def upsert(self, obj:ms.LogDefine) -> t.Optional[uuid.UUID]:
        queried_id = await self.conn.fetchval(
            f"""
                SELECT id FROM {TABLE_NAME}
                WHERE (prefix = $1 AND log_type = $2) OR id = $3
            """,
            obj.prefix,
            obj.log_type,
            obj.id,
        )
        if queried_id is None:
            return await self.insert(obj)
        else:
            return queried_id
