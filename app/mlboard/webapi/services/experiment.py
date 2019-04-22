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
    config: Dict[str, Optional[Union[str, int, float]]]


@router.get('/experiment/all', response_model=List[Experiment])
def all():
    res = pipe(
        qs.Experiment().all(),
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
