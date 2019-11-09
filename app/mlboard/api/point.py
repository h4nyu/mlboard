from fastapi import APIRouter
from uuid import UUID
import typing as t
from logging import getLogger
from mlboard.usecases.connectors import get_point_usecase
from mlboard.models.protocols import IPoint
from datetime import datetime
from logging import getLogger
from pydantic import BaseModel

logger = getLogger("api.trace")
router = APIRouter()
usecase = get_point_usecase()


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


class AddScalarIn(BaseModel):
    trace_id: UUID
    value: float
    ts: t.Optional[datetime]

@router.post('/point/add-scalar')
async def add_scalar(payload:AddScalarIn) -> None:
    await usecase.add_scalar(
        trace_id=payload.trace_id,
        value=payload.value,
        ts=payload.ts,
    )


class AddScalarsIn(BaseModel):
    values: t.Dict[UUID, float]
    ts: t.Optional[datetime]

@router.post('/point/add-scalars')
async def add_scalars(payload:AddScalarsIn) -> None:
    await usecase.add_scalars(
        values=payload.values,
        ts=payload.ts,
    )
