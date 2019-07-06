from cytoolz.curried import pipe, map, first, itemfilter, reduce
import typing
import uuid
import time
from logging import getLogger
from dataclasses import fields, asdict, astuple
from .. import models as ms
from .. import db
logger = getLogger("api")


#  class BaseQuery:
#      def __init__(self, conn):
#          self.conn = conn
#
#      def to_models(self, rows: typing.List):
#          model_cls = getattr(ms, self.__class__.__name__)
#          return pipe(
#              rows,
#              map(lambda x: model_cls(**dict(x))),
#              list
#          )
#
#      def to_model(self, row):
#          if row is not None:
#              model_cls = getattr(ms, self.__class__.__name__)
#              return model_cls(**dict(row))
#          else:
#              return None
#
#
#  class CrudMixin:
#
#      async def all(self):
#          sql = f"""
#              SELECT * FROM {self.table_name}
#          """
#          rows = await self.conn.fetch(sql)
#          return self.to_models(rows)
#
#      async def filter_by(self, **kwargs):
#          map_str = " AND ".join(
#              [f"{k}=(${i})" for i, k in enumerate(kwargs.keys(), start=1)])
#          sql = f"""
#              SELECT * FROM {self.table_name}
#              WHERE {map_str}
#          """
#          rows = await self.conn.fetch(
#              sql,
#              *kwargs.values()
#          )
#          return self.to_models(rows)
#
#      async def insert(self, obj):
#          keys = [f.name for f in fields(obj)]
#          keys_str = ",".join(keys)
#          value_map_str = ",".join(
#              [f"${i}" for i, _ in enumerate(keys, start=1)])
#          values = [getattr(obj, k) for k in keys]
#          queried_id = await self.conn.fetchval(
#              f"""
#                  INSERT INTO {self.table_name}({keys_str})
#                  VALUES ({value_map_str})
#                  RETURNING id
#              """,
#              *values
#          )
#          return queried_id
#
#      async def update(self, id, **kwargs):
#          keys = kwargs.keys()
#          keys_str = ",".join(keys)
#          map_str = ",".join([f"{k}=${i}" for i, k in enumerate(keys, start=2)])
#          queried_id =  await self.conn.fetchval(
#              f"""
#                  UPDATE {self.table_name}
#                  SET {map_str}
#                  WHERE id = $1
#                  RETURNING {self.table_name}.id
#              """,
#              id,
#              *kwargs.values(),
#          )
#          return queried_id
#
#      async def bulk_insert(self, objects):
#          if len(objects) > 0:
#              columns = [k.name for k in fields(objects[0])]
#              records = map(astuple)(objects)
#              await self.conn.copy_records_to_table(
#                  self.table_name,
#                  columns=columns,
#                  records=records
#              )
#          return len(objects)
#
#      async def get_by(self, **kwargs):
#          map_str = " AND ".join(
#              [f"{k}=(${i})" for i, k in enumerate(kwargs.keys(), start=1)])
#          values = kwargs.values()
#          sql = f"""
#              SELECT * FROM {self.table_name}
#              WHERE {map_str}
#          """
#          row = await self.conn.fetchrow(
#              sql,
#              *values,
#          )
#          if row is not None:
#              return self.to_model(row)
#          else:
#              return None
#
#      async def delete_by(self, **kwargs) -> None:
#          map_str = " AND ".join(
#              [f"{k}=(${i})" for i, k in enumerate(kwargs.keys(), start=1)])
#          values = kwargs.values()
#          sql = f"""
#              DELETE FROM {self.table_name}
#              WHERE {map_str}
#          """
#          await self.conn.execute(
#              sql,
#              *values,
#          )
#
#      async def delete(self) -> None:
#          sql = f"""
#              DELETE FROM {self.table_name}
#          """
#          await self.conn.execute(sql)
