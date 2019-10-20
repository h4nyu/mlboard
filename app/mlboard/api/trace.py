from fastapi import APIRouter, Query
import typing as t
from logging import getLogger
from cytoolz.curried import pipe, map
from pydantic import BaseModel
from mlboard.usecases.trace import create_usecase
from mlboard.models.protocols import IPoint
from mlboard.dao.postgresql import Connection
from mlboard.config import DB_CONN
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
) -> t.Sequence[IPoint]:
    async with Connection(DB_CONN) as conn:
        uc = create_usecase(conn)
        rows = await uc.range_by(
            tag=tag,
            from_date=from_date,
            to_date=to_date,
        )
    return rows
