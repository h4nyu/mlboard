from cytoolz.curried import map, pipe
from .. import models as ms
from .. import db
import uuid
import time
from logging import getLogger
import typing as t
from profilehooks import profile
from datetime import datetime
import pandas as pd
import numpy as np
from .crud import Crud
from ..database import IConnection, IRecord

logger = getLogger("api.query.trace")


TABLE_NAME = "trace_points"


class TracePoint:
    def __init__(self, conn: IConnection) -> None:
        self.conn = conn
        self.crud = Crud(
            conn,
            TABLE_NAME,
            ms.TracePoint,
            uuid.UUID,
        )

    async def delete(self) -> None:
        return await self.crud.delete()

    async def range_by(self, config_id, from_date, to_date, limit=10000) -> t.List[ms.TracePoint]:
        rows = await self.conn.fetch(
            f"""
                SELECT value, ts, config_id
                FROM {TABLE_NAME}
                WHERE config_id = $1
                    AND ts BETWEEN $2 AND $3
                ORDER BY ts ASC
                LIMIT $4
            """,
            config_id,
            from_date,
            to_date,
            limit,
        )

        return self.crud.to_models(rows)

    async def bulk_insert(self, objects) -> int:
        if len(objects) > 0:
            records = pipe(
                objects,
                map(lambda x: (x.ts, x.value, x.config_id)),
                list
            )
            await self.conn.copy_records_to_table(
                TABLE_NAME,
                columns=['ts', 'value', 'config_id'],
                records=records
            )
        count = len(objects)
        return count
