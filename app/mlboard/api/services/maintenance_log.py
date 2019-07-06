from mlboard.core import models as ms
from mlboard.core import queries as qs
from mlboard.core import db
from fastapi import APIRouter, Query
import typing
from logging import getLogger
from cytoolz.curried import pipe, map
from pydantic import BaseModel
import uuid
import datetime

router = APIRouter()


class MaintenanceLog(BaseModel):
    id: uuid.UUID
    maintenance_id: uuid.UUID
    occurred_date: datetime.datetime


@router.post('/maintenance-log', response_model=uuid.UUID)
async def upsert(payload: MaintenanceLog):
    maintenace_log = ms.MaintenanceLog(**dict(payload))
    async with db.get_conn() as conn:
        queried_id = await qs.MaintenanceLog(conn).upsert(maintenace_log)
    return queried_id


@router.delete('/maintenance-log', response_model=uuid.UUID)
async def delete_by(id: uuid.UUID):
    async with db.get_conn() as conn:
        queried_id = await qs.MaintenanceLog(conn).delete_by(id=id)
    return queried_id


@router.get('/maintenance-log/all')
async def all():
    async with db.get_conn() as conn:
        rows = await qs.MaintenanceLog(conn).all()
    return rows
