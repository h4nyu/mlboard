from .base_query import BaseQuery
from .. import db


class Trace(BaseQuery):

    @classmethod
    async def search_range(cls, trace_id, from_date, to_date):
        pass

