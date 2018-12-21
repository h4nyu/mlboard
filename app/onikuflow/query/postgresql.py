from .. import models as ms
from .base_query import BaseQuery


class Table(BaseQuery):
    entitiy_class = ms.Table
