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
usecase = create_usecase()


@router.get('/trace/all')
async def all():
    return await usecase.all()


class RegisterIn(BaseModel):
    tag: str


@router.post('/trace')
async def register(payload: RegisterIn):
    return await usecase.register(tag=payload.tag)


@router.delete('/trace')
async def delete_by(id: UUID) -> None:
    return await usecase.delete_by(id=id)
