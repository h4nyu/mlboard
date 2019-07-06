from mlboard.core import models as ms
from mlboard.core import queries as qs
from mlboard.core import db
from fastapi import APIRouter, Query
import typing
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
):
    async with db.get_conn() as conn:
        rows = await qs.Trace(conn).range_by(
            config_id=id,
            from_date=from_date,
            to_date=to_date,
            limit=limit
        )
    return rows

@router.get('/trace/diff-range-by')
async def diff_range_by(
    from_date: datetime.datetime,
    to_date: datetime.datetime,
    chamber_id:uuid.UUID,
):
    async with db.get_conn() as conn:
        rows = await qs.Trace(conn).diff_range_by(
            from_date=from_date,
            to_date=to_date,
            chamber_id=chamber_id,
        )
    return rows
