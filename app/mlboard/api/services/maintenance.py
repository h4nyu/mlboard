from mlboard.core import models as ms
from mlboard.core import queries as qs
from mlboard.core import db
from fastapi import APIRouter, Query
import typing
from logging import getLogger
from cytoolz.curried import pipe, map
from pydantic import BaseModel
import uuid
from datetime import datetime

router = APIRouter()


class MaintenanceForm(BaseModel):
    id: uuid.UUID
    name: str
    chamber_id: uuid.UUID


@router.get('/maintenance/all')
async def all():
    async with db.get_conn() as conn:
        rows = await qs.Maintenance(conn).all()
    return rows

@router.get('/maintenance')
async def get(id: uuid.UUID):
    async with db.get_conn() as conn:
        row = await qs.Maintenance(conn).get_by(id=id)
    return row


@router.get('/maintenance/filter-in')
async def filter_by(
    chamber_ids: typing.List[uuid.UUID] = Query([]),
):
    async with db.get_conn() as conn:
        rows = await qs.Maintenance(conn).filter_in(chamber_ids)
    return rows


@router.delete('/maintenance', response_model=uuid.UUID)
async def delete_by(id: uuid.UUID):
    async with db.get_conn() as conn:
        queried_id = await qs.Maintenance(conn).delete_by(id=id)
    return queried_id


@router.post('/maintenance', response_model=uuid.UUID)
async def upsert(payload: MaintenanceForm):
    maintenance = ms.Maintenance(**dict(payload))
    async with db.get_conn() as conn:
        queried_id = await qs.Maintenance(conn).upsert(maintenance)
    return queried_id

