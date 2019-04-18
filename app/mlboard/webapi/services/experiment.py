from fastapi import APIRouter
from fastapi.encoders import jsonable_encoder
from mlboard.orm import queries as qs
from logging import getLogger
from ..encoders import StrictEncoder
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import os
import uuid
logger = getLogger("api")

router = APIRouter()

class Experiment(BaseModel):
    id: uuid.UUID
    name: str
    memo: Optional[str]
    config: Dict

@router.get('/experiment/all', response_model=List[Experiment])
def all():
    res = qs.Experiment().all()
    aa  = Experiment()
    return aa
