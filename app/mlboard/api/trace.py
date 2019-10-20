from fastapi import APIRouter, Query
from uuid import UUID
import typing as t
from logging import getLogger
from cytoolz.curried import pipe, map
from pydantic import BaseModel
from mlboard.usecases.trace import create_usecase
from mlboard.models.protocols import IPoint
from mlboard.dao.postgresql import Connection
from mlboard.config import DB_CONN
from datetime import datetime
from logging import getLogger

logger = getLogger("api.trace")


router = APIRouter()


@router.get('/trace/range-by')
async def search_range(
    trace_id: UUID,
    from_date: datetime,
    to_date: datetime,
) -> t.Sequence[IPoint]:
    async with Connection(DB_CONN) as conn:
        uc = create_usecase(conn)
        rows = await uc.range_by(
            trace_id=trace_id,
            from_date=from_date,
            to_date=to_date,
        )
    return rows


class AddScalorIn(BaseModel):
    trace_id: UUID
    value: float
    ts: datetime


@router.post('/trace/add-scalar')
async def add_scalar(
    payload: AddScalorIn
) -> int:
    async with Connection(DB_CONN) as conn:
        uc = create_usecase(conn)
        logger.info(f"{payload}")
        count = await uc.add_scalar(
            trace_id=payload.trace_id,
            value=payload.value,
            ts=payload.ts,
        )
    return count


class RegisterIn(BaseModel):
    tag: str


@router.post('/trace')
async def register(
    payload: RegisterIn
) -> UUID:
    async with Connection(DB_CONN) as conn:
        uc = create_usecase(conn)
        logger.info(f"{payload}")
        trace_id = await uc.register_trace(
            tag=payload.tag,
        )
    logger.info(trace_id)
    return trace_id
