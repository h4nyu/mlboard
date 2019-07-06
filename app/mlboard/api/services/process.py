from fastapi import APIRouter
from mlboard.core import models as ms
from mlboard.core import queries as qs
from mlboard.core import db
from logging import getLogger
from pydantic import BaseModel
from cytoolz.curried import pipe, map
import typing
import uuid
import os
from datetime import datetime
logger = getLogger("api")

router = APIRouter()


@router.get('/process/all')
async def all():
    async with db.get_conn() as conn:
        rows = await qs.Process(conn).all()
    return rows
