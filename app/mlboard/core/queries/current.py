from .sensor import Sensor
from .process import Process
from .maintenance import Maintenance
from .. import models as ms
from ..database import IConnection, IRecord
from cytoolz.curried import curry
import uuid
import typing as t


class Current:
    def __init__(self, conn:IConnection):
        self.conn = conn

    def to_models(self, rows:t.List[IRecord]) -> t.List[ms.Current]:
        return [self.to_model(row) for row in rows]

    def to_model(self, row:IRecord) -> ms.Current:
        return ms.Current(**row) # type: ignore

    async def all(self) -> t.List[ms.Current]:
        rows = await self.conn.fetch(
            f"""
                SELECT id, value, collect_date, status
                FROM sensors
                UNION
                SELECT id, value, collect_date, status
                FROM processes
                UNION
                SELECT id, value, collect_date, status
                FROM maintenances
            """,
        )
        return self.to_models(rows)

    async def update_status(self, id, status) -> None:
        await Process(self.conn).update(
            id=id,
            status=status,
        )
        await Sensor(self.conn).update(
            id=id,
            status=status,
        )

        await Maintenance(self.conn).update(
            id=id,
            status=status,
        )

    async def update_value(self, id, value, collect_date) -> None:
        await Process(self.conn).update(
            id=id,
            value=value,
            collect_date=collect_date
        )
        await Sensor(self.conn).update(
            id=id,
            value=value,
            collect_date=collect_date
        )
        await Maintenance(self.conn).update(
            id=id,
            value=value,
            collect_date=collect_date
        )

    async def filter_in(self, ids: t.List[uuid.UUID]) -> t.List[ms.Current]:
        rows = await self.conn.fetch(
            f"""
                SELECT id, value, collect_date, status
                FROM (
                    SELECT id, value, collect_date, status
                    FROM sensors
                    UNION
                    SELECT id, value, collect_date, status
                    FROM processes
                    UNION
                    SELECT id, value, collect_date, status
                    FROM maintenances
                ) AS u
                WHERE u.id = any($1::uuid[]) AND u.value IS NOT NULL
            """,
            ids
        )
        return self.to_models(rows)
