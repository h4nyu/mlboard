from fastapi import APIRouter
from uuid import UUID
import typing as t
from logging import getLogger
from mlboard.usecases.point import create_usecase
from mlboard.models.protocols import IPoint
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


@router.get('/point/range-by-limit')
async def filter_by_limit(trace_id: UUID, limit: int) -> t.Sequence[IPoint]:
    return await usecase.filter_by_limit(
        trace_id=trace_id,
        limit=limit,
    )
