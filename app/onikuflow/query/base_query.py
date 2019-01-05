

import datetime
import abc
from sqlalchemy.orm.query import Query
from sqlalchemy.sql import text
from sqlalchemy import func, or_, text
from cytoolz.curried import pipe, map
from abc import ABC, abstractmethod
from .. import models as ms
from ..utils.decorators import kwargs_cast
import uuid
from sqlalchemy import func
import logging
logger = logging.getLogger()


def cast_args(func):
    def wrapper(*args, **kwargs):
        def _f(v):
            if isinstance(v, dict):
                obj = args[0].entitiy_class()
                return obj.from_dict(v)
            elif isinstance(v, str):
                return text(v)
            else:
                return v
        _kwargs = {k: _f(v) for k, v in kwargs.items()}
        _args = [_f(v) for v in args]
        return func(*_args, **_kwargs)
    return wrapper


class BaseQuery(Query):
    def __init__(self, session, entities=None):
        assert type(
            self.entitiy_class).__name__ == 'DeclarativeMeta', "sub class shoud have entitiy_class attribute"
        if entities is None:
            entities = self.entitiy_class
        if hasattr(entities, '__len__') and len(entities) == 0:
            entities = self.entitiy_class

        super().__init__(entities=entities, session=session)

    def last(self):
        return self.order_by(self.entitiy_class.id.desc()).first()

    def get_children(self, id):
        return []

    def max(self, column):
        return self.with_entities(func.max(column)).one()[0]

    def min(self, column):
        return self.with_entities(func.min(column)).one()[0]

    def mean(self, column):
        return self.with_entities(func.avg(column)).one()[0]

    def percentile_cont(self, column, percent):
        return self.with_entities(
            func.percentile_cont(percent).within_group(
                column
            ),
        ).one()[0]

    @cast_args
    def upsert(self, obj):
        if obj.id is None:
            obj.id = str(uuid.uuid4())
        self.session.merge(obj)
        self.session.commit()
        return self.get(obj.id)

    @cast_args
    def filter(self, *args, **kwargs):
        return super().filter(*args, **kwargs)

    def or_filter(self, **kwargs):
        or_args = []
        for k, v in kwargs.items():
            for cond in v:
                or_args.append(getattr(self.entitiy_class, k) == cond)
        return self.filter(or_(*or_args))

    def in_filter(self, **kwargs):
        in_args = []
        for k, v in kwargs.items():
            in_args.append(getattr(self.entitiy_class, k).in_(v))
        return self.filter(*in_args)

    def bulk_insert(self, objects):
        if(len(objects) > 0):
            sql = self.entitiy_class.__table__.insert()\
                .values(pipe(objects,
                             map(lambda x: x if isinstance(
                                 x, dict) else x.to_dict()),
                             list))
            self.session.execute(sql)

    def drop_tables(self, id):
        regex = self.table_.name + "_" + str(id).replace('-', '')
        tables = self.session.query(ms.Table)\
            .filter(text(f"table_name ~ '{regex}'"))\
            .all()
        for table in tables:
            self.session.execute(
                f"DROP TABLE IF EXISTS {table.table_schema}.{table.table_name};")

        self.session.commit()

    def delete(self):
        super().delete(synchronize_session='fetch')
        self.session.commit()

    def delete_cascade(self, id):
        import onikuflow.query as qs
        pipe(
            self.get_children(id),
            map(lambda x: (
                getattr(qs, x.__class__.__name__)(
                    session=self.session
                ).delete_cascade(x.id)
            )),
            list
        )

        self.filter(self.entitiy_class.id == id).delete()
        return id
