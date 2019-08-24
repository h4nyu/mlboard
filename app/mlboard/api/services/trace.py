from mlboard.core import models as ms
from mlboard.core import queries as qs
from fastapi import APIRouter, Query
import typing as t
from logging import getLogger
from cytoolz.curried import pipe, map
from pydantic import BaseModel
import uuid
import datetime
from logging import getLogger
logger = getLogger("api.trace")

router = APIRouter()


@router.get('/trace/range-by')
async def search_range(
    tag: str,
    from_date: datetime.datetime,
    to_date: datetime.datetime,
    limit: int = 10000,
) -> t.List[ms.TracePoint]:
    async with qs.get_conn() as conn:
        rows = await qs.TracePoint(conn).range_by(
            tag=tag,
            from_date=from_date,
            to_date=to_date,
            limit=limit
        )
    return rows
