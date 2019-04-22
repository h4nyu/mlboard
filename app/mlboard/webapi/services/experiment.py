from fastapi import APIRouter
from fastapi.encoders import jsonable_encoder
from mlboard.orm import queries as qs
from logging import getLogger
from cytoolz.curried import pipe, map
from pydantic import BaseModel
from datetime import datetime
from typing import List, Dict, Any, Optional
import uuid
logger = getLogger("api")

router = APIRouter()


class Experiment(BaseModel):
    id: uuid.UUID
    name: str
    memo: Optional[str]
    config: Dict
    create_date: datetime


@router.get('/experiment/all', response_model=List[Experiment])
async def all():
    res = pipe(
        qs.Experiment().all(),
        map(lambda x: Experiment(
            id=x.id,
            name=x.name,
            memo=x.memo,
            config=x.config,
        )),
        list
    )
    return res
