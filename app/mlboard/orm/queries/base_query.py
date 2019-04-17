from toolz.curried import pipe, map, first, itemfilter, reduce
from abc import ABC, abstractmethod
from peewee import ModelSelect, DoesNotExist
import uuid
import time
from .. import models as ms
from logging import getLogger
logger = getLogger("api")


class BaseQuery(object):

    @property
    def __entity_cls(self):
        return getattr(ms, self.__class__.__name__)

    def upsert(self, obj) -> uuid.UUID:
        row = self.get_or_none(id=obj.id)
        if row is None:
            return self.__entity_cls.insert(**obj.to_dict()).execute()
        else:
            source_dict = row.to_dict()
            obj_dict = obj.to_dict()
            diff = itemfilter(
                lambda x: f"{source_dict[x[0]]}" != f"{x[1]}",
                obj_dict
            )
            if len(diff) > 0:
                (self.__entity_cls
                 .update(**diff)
                 .where(self.__entity_cls.id == row.id)
                 .execute())
            return obj.id

    def all(self):
        return list(self.__entity_cls.select())

    def delete(self):
        return self.__entity_cls.delete().execute()

    def get_or_none(self, **kwargs):
        args = pipe(
            kwargs.items(),
            map(lambda x: (getattr(self.__entity_cls, x[0]) == x[1])),
            list
        )
        return self.__entity_cls.get_or_none(*args)

    def filter_by(self, **kwargs):
        args = pipe(
            kwargs.items(),
            map(lambda x: (getattr(self.__entity_cls, x[0]) == x[1])),
            list
        )
        return list(self.__entity_cls.select().where(*args))

    def filter_in(self, **kwargs):
        args = pipe(
            kwargs.items(),
            map(lambda x: (getattr(self.__entity_cls, x[0]) << x[1])),
            list
        )
        return list(self.__entity_cls.select().where(*args))

    def bulk_insert(self, objects):
        if len(objects) > 0:
            _objects = pipe(
                objects,
                map(lambda x: x if isinstance(
                    x, dict) else x.to_dict()),
                list
            )
            self.__entity_cls.insert_many(_objects).execute()
        return len(objects)
