from .. import models as ms
import uuid
from .maintenance_log import MaintenanceLog
from .trace_level import TraceLevel
from .crud import Crud
from mlboard.core.database import IConnection, IRecord
import typing as t

TABLE_NAME = "maintenances"
class Maintenance:
    def __init__(self, conn:IConnection):
        self.conn = conn
        self.crud = Crud(
            conn,
            TABLE_NAME,
            ms.Maintenance,
            uuid.UUID,
        )

    async def filter_by(self, **kwargs:t.Any) -> t.List[ms.Maintenance]:
        return await self.crud.filter_by(**kwargs)

    async def all(self) -> t.Sequence[ms.Maintenance]:
        return await self.crud.all()

    async def delete(self) -> None:
        return await self.crud.delete()

    async def insert(self, obj:ms.Maintenance) -> t.Optional[uuid.UUID]:
        return await self.crud.insert(obj)

    async def update(self, id:uuid.UUID, **kwargs: t.Any) -> t.Optional[uuid.UUID]:
        return await self.crud.update(id, **kwargs)

    async def get_by(self, **kwargs: t.Any) -> t.Optional[ms.Maintenance]:
        return await self.crud.get_by(**kwargs)

    async def upsert(self, obj: ms.Maintenance) -> t.Optional[uuid.UUID]:
        async with self.conn.transaction():
            queried_id = await self.conn.fetchval(
                f"""
                    SELECT id
                    FROM {TABLE_NAME}
                    WHERE (chamber_id = $1 AND name = $2) OR id = $3
                """,
                obj.chamber_id,
                obj.name,
                obj.id,
            )
            if queried_id is None:
                queried_id = await self.insert(obj)
            else:
                queried_id = await self.update(
                    id=queried_id,
                    chamber_id=obj.chamber_id,
                    name=obj.name,
                )

        return queried_id

    async def delete_by(self, id):
        async with self.conn.transaction():
            queried_id = await self.conn.execute(
                f"""
                    DELETE FROM {TABLE_NAME}
                    WHERE id = $1;
                """,
                id
            )
            await TraceLevel(self.conn).delete_by(id=id)
            await MaintenanceLog(self.conn).delete_by(maintenance_id=id)
        return id

    async def filter_in(self, chamber_ids=[]) -> t.List[ms.Maintenance]:
        rows = await self.conn.fetch(
            f"""
                SELECT *
                FROM {TABLE_NAME}
                WHERE chamber_id = any($1::uuid[])
            """,
            chamber_ids
        )
        return self.crud.to_models(rows)
