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

    def upsert(self, obj):
        row = self.get_or_none(id=obj.id)
        if row is None:
            new_id = self.model_cls.insert(**obj.to_dict()).execute()
            return self.get_or_none(id=obj.id)
        else:
            source_dict = row.to_dict()
            obj_dict = obj.to_dict()
            diff = itemfilter(
                lambda x: f"{source_dict[x[0]]}" != f"{x[1]}",
                obj_dict
            )
            if len(diff) > 0:
                (self.model_cls
                 .update(**diff)
                 .where(self.model_cls.id == row.id)
                 .execute())
            return obj

    def all(self):
        return list(self.model_cls.select())

    def get_or_none(self, **kwargs):
        args = pipe(
            kwargs.items(),
            map(lambda x: (getattr(self.model_cls, x[0]) == x[1])),
            list
        )
        return self.model_cls.get_or_none(*args)

    def filter_by(self, **kwargs):
        args = pipe(
            kwargs.items(),
            map(lambda x: (getattr(self.model_cls, x[0]) == x[1])),
            list
        )
        return list(self.model_cls.select().where(*args))

    def bulk_insert(self, objects):
        if len(objects) > 0:
            _objects = pipe(
                objects,
                map(lambda x: x if isinstance(
                    x, dict) else x.to_dict()),
                list
            )
            self.model_cls.insert_many(_objects).execute()
        return len(objects)

    def delete(self):
        return self.model_cls.delete().execute()


class Trace(Query):

    @property
    def model_cls(self):
        return ms.Trace

    def search_range(self, experiment_id, from_date, to_date):
        return list(self.model_cls
                    .select()
                    .where(
                        self.model_cls.experiment_id == experiment_id,
                        self.model_cls.ts < to_date,
                        self.model_cls.ts >= from_date,
                    )
                    .order_by(self.model_cls.ts))


class Experiment(Query):

    @property
    def model_cls(self):
        return ms.Experiment

    def delete_cascade(self, id):
        self.filter(self.model_cls.id == id).delete()
        (Trace()
         .filter(ms.Trace.experiment_id == id)
         .delete())
        return id
