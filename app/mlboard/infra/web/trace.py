import typing as t
from fastapi import APIRouter
from uuid import UUID
from logging import getLogger
from pydantic import BaseModel
from mlboard.usecases.connectors import TraceUsecase
from mlboard.infra.db.connectors import ContextManager
from mlboard.models.protocols import ITrace
from logging import getLogger

logger = getLogger("api.trace")
router = APIRouter()


@router.get('/trace/all')
async def all() -> t.Sequence[ITrace]:
    async with ContextManager() as conn:
        return await TraceUsecase(conn).all()


class RegisterIn(BaseModel):
    name: str
    workspace_id: UUID


@router.post('/trace')
async def register(payload: RegisterIn) -> UUID:
    async with ContextManager() as conn:
        return await TraceUsecase(conn).register(
            name=payload.name,
            workspace_id=payload.workspace_id,
        )


@router.delete('/trace')
async def delete_by(id: UUID) -> None:
    async with ContextManager() as conn:
        return await TraceUsecase(conn).delete_by(id=id)
