from mlboard.core import models as ms
from mlboard.core import queries as qs
from mlboard.core import db
from fastapi import APIRouter
import typing
from logging import getLogger
from cytoolz.curried import pipe, map
from pydantic import BaseModel
import uuid
from datetime import datetime

router = APIRouter()

@router.get('/sensor/all')
async def all():
    async with db.get_conn() as conn:
        rows = await qs.Sensor(conn).all()
        return rows
