from fastapi import APIRouter, Query
from uuid import UUID
import typing as t
from logging import getLogger
from cytoolz.curried import pipe, map
from pydantic import BaseModel
from mlboard.usecases.point import create_usecase
from mlboard.models.protocols import IPoint
from mlboard.dao.postgresql import Connection
from mlboard.config import DB_CONN
from datetime import datetime
from logging import getLogger

logger = getLogger("api.trace")
router = APIRouter()
usecase = create_usecase()


@router.get('/point/range-by')
async def range_by(trace_id: UUID, from_date: datetime, to_date: datetime) -> t.Sequence[IPoint]:
    return await usecase.range_by(
        trace_id=trace_id,
        from_date=from_date,
        to_date=to_date,
    )