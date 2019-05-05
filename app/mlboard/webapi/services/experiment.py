from fastapi import APIRouter
from mlboard.orm import queries as qs
from mlboard.orm import models as ms
from mlboard.orm import db
from logging import getLogger
from cytoolz.curried import pipe, map
from pydantic import BaseModel
from datetime import datetime
from typing import List, Dict, Any, Optional, Union
import uuid
logger = getLogger("api")

router = APIRouter()


class Experiment(BaseModel):
    id: uuid.UUID
    name: str
    memo: str
    config: Dict[Any, Any]
    create_date: datetime

@router.get('/experiment/all', response_model=List[ms.Experiment])
async def all():
    async with db.get_conn() as conn:
        rows = await qs.Experiment(conn).all()
    res = pipe(
        rows,
        map(lambda x: Experiment(
            id=x.id,
            name=x.name,
            memo=x.memo,
            config=x.config,
            create_date=x.create_date,
        )),
        list
    )
    return res

@router.delete('/experiment', response_model=uuid.UUID)
async def all(*, id: uuid.UUID):
    async with db.get_conn() as conn:
        await qs.Experiment(conn).delete_by(id=id)
    return id
