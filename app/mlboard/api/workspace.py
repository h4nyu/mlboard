import typing as t
from fastapi import APIRouter
from logging import getLogger
from mlboard.usecases.connectors import get_workspace_usecase
from mlboard.models.protocols import IWorkspace
from pydantic import BaseModel
from logging import getLogger
from uuid import UUID

logger = getLogger("api.workspace")
router = APIRouter()
usecase = get_workspace_usecase()

@router.get('/workspace/all')
async def all() -> t.Sequence[IWorkspace]:
    return await usecase.all()

class RegisterIn(BaseModel):
    name: str
    params: t.Dict[str, t.Any]

@router.post('/workspace')
async def register(payload:RegisterIn) -> UUID:
    return await usecase.register(
        name=payload.name,
        params=payload.params,
    )

@router.delete('/workspace')
async def delete_by(id:UUID) -> None:
    return await usecase.delete_by(id=id)
