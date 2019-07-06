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


TABLE_NAME = "traces"
class Trace:
    def __init__(self, conn:IConnection):
        self.conn = conn
        self.crud = Crud(
            conn,
            TABLE_NAME,
            ms.Trace,
            uuid.UUID,
        )

    async def delete(self) -> None:
        return await self.crud.delete()

    async def range_by(self, config_id, from_date, to_date, limit=10000) -> t.Sequence[ms.Trace]:
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

    async def diff_range_by(
        self,
        from_date:datetime,
        to_date:datetime,
        chamber_id:uuid.UUID,
        limit=100000,
    ) -> t.Dict[str, t.Union[float, uuid.UUID]]:
        rows = await self.conn.fetch(
            f"""
                SELECT traces.config_id, traces.value, traces.ts
                FROM traces
                LEFT JOIN sensors as ss on ss.id = traces.config_id
                LEFT JOIN processes as ps on ps.id = traces.config_id
                WHERE traces.ts BETWEEN $1 AND $2
                    AND (ps.chamber_id = $3 OR ss.chamber_id = $3)
                ORDER BY ts DESC
                LIMIT $4
            """,
            from_date,
            to_date,
            chamber_id,
            limit,
        )

        if(len(rows) == 0):
            return []
        else:
            df = pd.DataFrame([(row['config_id'], row['value']) for row in rows], columns=['id', 'value'])
            grouped = df.groupby('id')
            means = grouped.mean()
            stds = grouped.std()
            maxs = grouped.max()
            mins = grouped.min()
            normrizes = ((maxs - mins))/stds
            normrizes = normrizes[~normrizes.isin([np.nan, np.inf, -np.inf]).any(1)]
            return [{"id": id, "value": value} for id, (value, ) in normrizes.iterrows()]

    async def last_by_config_id(self) -> t.Sequence[ms.Trace]:
        rows = await self.conn.fetch(
            f"""
                SELECT config_id, last(ts, ts) as ts, last(value, ts) as value
                FROM traces
                GROUP BY config_id;
            """,
        )
        return self.crud.to_models(rows)

    async def bulk_insert(self, objects) -> int:
        start = time.time()
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
        duration = (time.time() - start)
        count = len(objects)
        return count
