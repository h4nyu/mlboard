from mlboard.core import models as ms
from mlboard.core import queries as qs
from mlboard.core import db
from fastapi import APIRouter
from typing import List, Dict, Any, Optional, Union
from logging import getLogger
from cytoolz.curried import pipe, map
from pydantic import BaseModel
import uuid
import datetime
import os
logger = getLogger("api")

router = APIRouter()


class TraceLevel(BaseModel):
    id: uuid.UUID
    warning_level: Optional[float]
    error_level: Optional[float]


@router.get('/trace-level/all')
async def all():
    async with db.get_conn() as conn:
        rows = await qs.TraceLevel(conn).all()
    return rows


@router.get('/trace-level')
async def get(id: uuid.UUID):
    async with db.get_conn() as conn:
        row = await qs.TraceLevel(conn).get_by(id=id) # type: ignore
    return row


@router.delete('/trace-level', response_model=uuid.UUID)
async def delete_by(id: uuid.UUID):
    async with db.get_conn() as conn:
        await qs.TraceLevel(conn).delete_by(id=id) # type: ignore
    return id


@router.post('/trace-level', response_model=Optional[uuid.UUID])
async def upsert(payload: TraceLevel):
    trace_level = ms.TraceLevel(**dict(payload))
    async with db.get_conn() as conn:
        return await qs.TraceLevel(conn).upsert(trace_level) # type: ignore
