from cytoolz.curried import pipe, map
from .base_query import BaseQuery
from .. import db
from .. import models as ms
import uuid
import datetime
import sqlalchemy as sa


class TracePoint(BaseQuery):
    @classmethod
    async def range_by_ts(cls,
                          trace_id: uuid.UUID,
                          from_date: datetime.datetime,
                          to_date: datetime.datetime):

        rows = await db.fetch_all(
            sa.select([ms.TracePoint])
            .where(ms.TracePoint.trace_id == trace_id)
            .where(ms.TracePoint.ts >= from_date)
            .where(ms.TracePoint.ts < to_date)
        )
        return pipe(
            rows,
            map(lambda x: ms.TracePoint(**dict(x))),
            list
        )
