from fastapi import APIRouter
from mlboard.orm import queries as qs
from logging import getLogger
from cytoolz.curried import pipe, map
from pydantic import BaseModel
from datetime import datetime
from typing import List, Dict, Any, Optional, Union
import uuid
logger = getLogger("api")

router = APIRouter()


class Trace(BaseModel):
    id: uuid.UUID
    name: str
    experiment_id: uuid.UUID
    create_date: datetime


@router.get('/trace/all', response_model=List[Trace])
async def all():
    rows = await qs.Trace.all()
    res = pipe(
        rows,
        map(lambda x: Trace(
            id=x.id,
            name=x.name,
            experiment_id=x.experiment_id,
            create_date=x.create_date,
        )),
        list
    )
    return res


@router.get('/trace/filter-by', response_model=List[Trace])
async def all(*, experiment_id: uuid.UUID):
    rows = await qs.Trace.filter_by(experiment_id=experiment_id)
    return pipe(
        rows,
        map(lambda x: Trace(
            id=x.id,
            name=x.name,
            experiment_id=x.experiment_id,
            create_date=x.create_date,
        )),
        list
    )
