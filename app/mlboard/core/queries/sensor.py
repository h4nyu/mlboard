from toolz.curried import pipe, map, take, first, concat, filter, sorted, unique, reduce
from .. import models as ms
from ..database import IConnection
import uuid
from .crud import Crud
import typing as t


TABLE_NAME = "sensors"
class Sensor:
    def __init__(self, conn:IConnection):
        self.conn = conn
        self.crud = Crud(
            conn,
            TABLE_NAME,
            ms.Sensor,
            uuid.UUID,
        )
    async def all(self) -> t.List[ms.Sensor]:
        return await self.crud.all()

    async def delete(self) -> None:
        return await self.crud.delete()

    async def update(self, id:uuid.UUID, **kwargs) -> t.Optional[uuid.UUID]:
        return await self.crud.update(id, **kwargs)

    async def get_by(self, **kwargs) -> t.Optional[ms.Sensor]:
        return await self.crud.get_by(**kwargs)

    async def insert(self, obj:ms.Sensor) -> t.Optional[uuid.UUID]:
        return await self.crud.insert(obj)

    async def filter_by(self, **kwargs:t.Any) -> t.List[ms.Sensor]:
        return await self.crud.filter_by(**kwargs)

    async def upsert(self, obj: ms.Sensor) -> t.Optional[uuid.UUID]:
        async with self.conn.transaction():
            sensor_id = await self.conn.fetchval(
                f"""
                    SELECT id
                    FROM {TABLE_NAME}
                    WHERE (col_name = $1 AND log_define_id = $2) OR id = $3
                """,
                obj.col_name,
                obj.log_define_id,
                obj.id,
            )
            if sensor_id is None:
                sensor_id = await self.insert(obj)
        return sensor_id
