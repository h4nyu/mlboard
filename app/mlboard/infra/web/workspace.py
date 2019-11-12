import typing as t
from fastapi import APIRouter
from logging import getLogger
from mlboard.usecases.connectors import WorkspaceUsecase
from mlboard.models.protocols import IWorkspace
from mlboard.infra.db.connectors import ContextManager
from pydantic import BaseModel
from logging import getLogger
from uuid import UUID

logger = getLogger("api.workspace")
router = APIRouter()


@router.get('/workspace/all')
async def all() -> t.Sequence[IWorkspace]:
    async with ContextManager() as conn:
        return await WorkspaceUsecase(conn).all()


class RegisterIn(BaseModel):
    name: str
    params: t.Dict[str, t.Any]


@router.post('/workspace')
async def register(payload: RegisterIn) -> UUID:
    async with ContextManager() as conn:
        return await WorkspaceUsecase(conn).register(
            name=payload.name,
            params=payload.params,
        )


@router.delete('/workspace')
async def delete_by(id: UUID) -> None:
    async with ContextManager() as conn:
        return await WorkspaceUsecase(conn).delete_by(id=id)
