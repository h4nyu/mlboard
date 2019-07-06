from mlboard.core import models as ms
from mlboard.core import queries as qs
from mlboard.core import db
from fastapi import APIRouter, Query
from typing import List, Dict, Any, Optional, Union
from logging import getLogger
from cytoolz.curried import pipe, map
from pydantic import BaseModel
import uuid
from datetime import datetime

router = APIRouter()


class EventSection(BaseModel):
    id: uuid.UUID
    from_date: datetime
    to_date: datetime
    code: str
    status: int
    message: str
    chamber_id: uuid.UUID
    substract_id: str



@router.get('/event-section/range-by')
async def range_by(
    from_date: datetime,
    to_date: datetime,
    chamber_ids: List[uuid.UUID] = Query(None),
):
    async with db.get_conn() as conn:
        rows = await qs.EventSection(conn).range_by(
            chamber_ids=chamber_ids,
            from_date=from_date,
            to_date=to_date,
        )
    return rows
