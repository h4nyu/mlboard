from .. import models as ms
import typing
import uuid
import typing as t
from ..database import IConnection, IRecord
from .crud import Crud

TABLE_NAME = "maintenance_logs"
class MaintenanceLog:
    def __init__(self, conn:IConnection):
        self.conn = conn
        self.crud = Crud(
            conn,
            TABLE_NAME,
            ms.MaintenanceLog,
            uuid.UUID,
        )

    async def all(self ) -> t.Sequence[ms.MaintenanceLog]:
        return await self.crud.all()

    async def insert(self, obj:ms.MaintenanceLog)->t.Optional[uuid.UUID]:
        return await self.crud.insert(obj)

    async def update(self, id:uuid.UUID,**kwargs: t.Any)->t.Optional[uuid.UUID]:
        return await self.crud.update(id, **kwargs)

    async def filter_in(self, maintenace_ids: typing.List[uuid.UUID] = []):
        return await self.conn.fetch(
            f"""
                SELECT *
                FROM {TABLE_NAME}
                WHERE maintenance_id = any($1::uuid[])
            """,
            maintenace_ids
        )

    async def upsert(self, obj) -> t.Optional[uuid.UUID]:
        async with self.conn.transaction():
            parent_id = await self.conn.fetchval(
                f"""
                    SELECT id
                    FROM maintenances
                    WHERE id = $1
                """,
                obj.maintenance_id,
            )
            if parent_id is None:
                raise Exception('no parent record')
            else:
                return await self.insert(obj)

    async def delete_by(self, **kwargs:t.Any) -> None:
        return await self.crud.delete_by(**kwargs)

    async def get_lasts(self) -> t.List[ms.MaintenanceLog]:
        rows = await self.conn.fetch(
            f"""
                SELECT
                    last(id, occurred_date) as id,
                    maintenance_id,
                    last(occurred_date, occurred_date) as occurred_date,
                    last(create_date, occurred_date) as create_date
                FROM
                    {TABLE_NAME}
                GROUP BY maintenance_id;
            """,
        )
        return self.crud.to_models(rows)

    async def bulk_insert(self, rows:t.List[ms.MaintenanceLog]) -> int:
        return await self.crud.bulk_insert(rows)

    async def delete(self) -> None:
        return await self.crud.delete()
