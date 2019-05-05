from cytoolz.curried import pipe, map
from .base_query import BaseQuery
from .. import db
from .. import models as ms
import uuid
import datetime
import time
from logging import getLogger
logger = getLogger("api.query")


class TracePoint(BaseQuery):
    async def range_by_ts(self,
                          trace_id: uuid.UUID,
                          from_date: datetime.datetime,
                          to_date: datetime.datetime):

        sql = f"""
            SELECT * FROM {self.table_name}
            WHERE trace_id = $1
                AND ts BETWEEN $2 AND $3
        """
        rows = await self.conn.fetch(
            sql,
            trace_id,
            from_date,
            to_date,
        )
        return self.to_models(rows)

    async def bulk_insert(self, rows):
        if len(rows) > 0:
            start = time.time()
            await self.conn.copy_records_to_table(
                self.table_name,
                columns=['ts', 'y', 'x', 'trace_id'],
                records=map(lambda r: (r.ts, r.y, r.x, r.trace_id))(rows),
            )
            duration = time.time() - start
            logger.debug(f'insert rate:{len(rows)/duration}')
