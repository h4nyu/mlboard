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


class Experiment(BaseModel):
    id: uuid.UUID
    name: str
    memo: Optional[str]
    config: Optional[Dict[Any, Any]]
    create_date: datetime


@router.get('/experiment/all', response_model=List[Experiment])
async def all():
    rows = await qs.Experiment.all()
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
    await qs.Experiment.delete_by(id=id)
    return id
