import typing as t
from fastapi import APIRouter
from uuid import UUID
from logging import getLogger
from pydantic import BaseModel
from mlboard.usecases.connectors import get_workspace_usecase
from mlboard.models.protocols import IWorkspace
from logging import getLogger

logger = getLogger("api.workspace")
router = APIRouter()
usecase = get_workspace_usecase()


@router.get('/workspace/all')
async def all() -> t.Sequence[IWorkspace]:
    return await usecase.all()
