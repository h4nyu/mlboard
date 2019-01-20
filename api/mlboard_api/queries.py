from toolz.curried import pipe, map, first, itemfilter
from abc import ABC, abstractmethod
from peewee import ModelSelect, DoesNotExist
import uuid
from . import models as ms

__all__ = ["Experiment", "Trace"]


class Query(ABC):

    @abstractmethod
    def model_cls(self):
        pass


class BaseQuery(Query):
    def __init__(self, *fields):
        self.__fields = fields
        self.__filter_args = []
        self.__limit_arg = None
        self.__order_by_arg = None

    def __select(self):
        q = self.model_cls.select(*self.__fields)
        if len(self.__filter_args) > 0:
            q = q.where(*self.__filter_args)
        if self.__order_by_arg is not None:
            q = q.order_by(self.__order_by_arg)
        if self.__limit_arg is not None:
            q = q.limit(self.__limit_arg)
        return q

    def filter(self, args):
        self.__filter_args.append(args)
        return self

    def filter_by(self, **kwargs):
        args = pipe(
            kwargs.items(),
            map(lambda x: (getattr(self.model_cls, x[0]) == x[1])),
            list
        )
        if len(args) > 0:
            self.__filter_args.append(*args)
        return self

    def limit(self, num: int):
        self.__limit_arg = num
        return self

    def all(self):
        return list(self.__select().execute())

    def delete(self) -> int:
        q = self.model_cls.delete()
        if len(self.__filter_args) > 0:
            q = q.where(*self.__filter_args)
        return q.execute()

    def order_by(self, arg):
        self.__order_by_arg = arg
        return self

    def delete_cascade(self, id):
        q = self.model_cls.delete()
        if len(self.__filter_args) > 0:
            q = q.where(*self.__filter_args)
        return q.execute()

    def first(self):
        try:
            return self.__select().get()
        except DoesNotExist:
            return None

    def get(self, id):
        try:
            return self.filter_by(id=id).first()
        except DoesNotExist:
            return None

    def bulk_insert(self, objects):
        _objects = pipe(
            objects,
            map(lambda x: x if isinstance(
                x, dict) else x.to_dict()),
            list
        )
        self.model_cls.insert_many(_objects).execute()

    def upsert(self, obj):
        row = self.get(obj.id)
        if row is None:
            new_id = self.model_cls.insert(**obj.to_dict()).execute()
            return self.get(new_id)
        else:
            source_dict = row.to_dict()
            obj_dict = obj.to_dict()
            diff = itemfilter(
                lambda x: f"{source_dict[x[0]]}" != f"{x[1]}",
                obj_dict
            )
            self.model_cls.update(**diff).execute()
            return obj_dict


class Trace(BaseQuery):

    @property
    def model_cls(self):
        return ms.Trace


class Experiment(BaseQuery):

    @property
    def model_cls(self):
        return ms.Experiment

    def delete_cascade(self, id):
        self.filter(self.model_cls.id == id).delete()
        (Trace()
         .filter(ms.Trace.experiment_id == id)
         .delete())
        return id
