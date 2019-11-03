import typing as t
from fastapi import APIRouter
from uuid import UUID
from logging import getLogger
from pydantic import BaseModel
from mlboard.usecases.connectors import get_trace_usecase
from mlboard.models.protocols import ITrace
from logging import getLogger

logger = getLogger("api.trace")
router = APIRouter()
usecase = get_trace_usecase()


@router.get('/trace/all')
async def all() -> t.Sequence[ITrace]:
    return await usecase.all()


class RegisterIn(BaseModel):
    tag: str


@router.post('/trace')
async def register(payload: RegisterIn) -> UUID:
    return await usecase.register(tag=payload.tag)


@router.delete('/trace')
async def delete_by(id: UUID) -> None:
    return await usecase.delete_by(id=id)
