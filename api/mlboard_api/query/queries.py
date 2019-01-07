from sqlalchemy.sql.expression import func
from datetime import datetime, timedelta
from dateutil import tz
from cytoolz.curried import pipe, map, filter
from .. import models as ms
from .base_query import BaseQuery
import uuid


class Trace(BaseQuery):
    entitiy_class = ms.Trace


class Experiment(BaseQuery):
    entitiy_class = ms.Experiment

    def delete_cascade(self, id):
        super().delete_cascade(id)
        (Trace(session=self.session)
         .filter(ms.Trace.experiment_id == id)
         .delete())
