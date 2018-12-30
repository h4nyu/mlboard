from sqlalchemy.sql.expression import func
from datetime import datetime, timedelta
from dateutil import tz
from cytoolz.curried import pipe, map, filter
from .. import models as ms
from .base_query import BaseQuery, InfoOutputBase, cast_args
import uuid

class Trace(BaseQuery):
    entitiy_class = ms.Trace

class Experiment(BaseQuery):
    entitiy_class = ms.Experiment
