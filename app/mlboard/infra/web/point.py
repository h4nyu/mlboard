from fastapi import APIRouter
from uuid import UUID
import typing as t
from logging import getLogger
from mlboard.usecases.connectors import PointUsecase
from mlboard.infra.db.connectors import ContextManager
from mlboard.models.protocols import IPoint
from datetime import datetime
from logging import getLogger
from pydantic import BaseModel

logger = getLogger("api.trace")
router = APIRouter()


@router.get('/point/range-by')
async def range_by(trace_id: UUID, from_date: datetime, to_date: datetime) -> t.Sequence[IPoint]:
    async with ContextManager() as conn:
        return await PointUsecase(conn).range_by(
            trace_id=trace_id,
            from_date=from_date,
            to_date=to_date,
        )


@router.get('/point/range-by-limit')
async def filter_by_limit(trace_id: UUID, limit: int) -> t.Sequence[IPoint]:
    async with ContextManager() as conn:
        return await PointUsecase(conn).filter_by_limit(
            trace_id=trace_id,
            limit=limit,
        )


class AddScalarIn(BaseModel):
    trace_id: UUID
    value: float
    ts: t.Optional[datetime]


@router.post('/point/add-scalar')
async def add_scalar(payload: AddScalarIn) -> None:
    async with ContextManager() as conn:
        await PointUsecase(conn).add_scalar(
            trace_id=payload.trace_id,
            value=payload.value,
            ts=payload.ts,
        )


class AddScalarsIn(BaseModel):
    values: t.Dict[UUID, float]
    ts: t.Optional[datetime]


@router.post('/point/add-scalars')
async def add_scalars(payload: AddScalarsIn) -> None:
    async with ContextManager() as conn:
        await PointUsecase(conn).add_scalars(
            values=payload.values,
            ts=payload.ts,
        )
