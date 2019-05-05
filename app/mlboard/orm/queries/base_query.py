from cytoolz.curried import pipe, map, first, itemfilter, reduce
import sqlalchemy as sa
import uuid
import time
from logging import getLogger
from .. import models as ms
from .. import db
from dataclasses import fields, asdict, astuple
import typing
from abc import ABC, abstractmethod
import ujson
import pprint
import asyncio

logger = getLogger("api.query")


class BaseQuery(ABC):
    def __init__(self, conn):
        self.conn = conn

    @property
    def table_name(self):
        model_cls = getattr(ms, self.__class__.__name__)
        return model_cls.Config.table_name

    async def all(self):
        sql = f"""
            SELECT * FROM {self.table_name}
        """
        rows = await self.conn.fetch(sql)
        return self.to_models(rows)

    async def delete(self) -> None:
        sql = f"""
            DELETE FROM {self.table_name}
        """
        await self.conn.execute(sql)

    def to_models(self, rows: typing.List):
        model_cls = getattr(ms, self.__class__.__name__)
        return pipe(
            rows,
            map(lambda x: model_cls(**dict(x))),
            list
        )
