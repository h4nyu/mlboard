from mlboard.core import models as ms
from mlboard.core import queries as qs
from mlboard.core import db
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
    id: uuid.UUID,
    from_date: datetime.datetime,
    to_date: datetime.datetime,
    limit: int = 10000,
) -> t.List[ms.Trace]:
    async with db.get_conn() as conn:
        rows = await qs.Trace(conn).range_by(
            config_id=id,
            from_date=from_date,
            to_date=to_date,
            limit=limit
        )
    return rows
