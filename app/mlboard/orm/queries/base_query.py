from toolz.curried import pipe, map, first, itemfilter, reduce
import sqlalchemy as sa
import uuid
import time
from logging import getLogger
from .. import models as ms
from .. import db
logger = getLogger("api")


class BaseQuery(object):

    @classmethod
    def get_model_cls(cls):
        return getattr(ms, cls.__name__)

    @classmethod
    async def all(cls):
        model_cls = cls.get_model_cls()
        q = sa.select([model_cls])
        rows = await db.fetch_all(q)
        return pipe(
            rows,
            map(lambda x: model_cls(**dict(x))),
            list
        )

    @classmethod
    async def upsert(cls, obj, getkey=lambda x: x.id) -> uuid.UUID:
        model_cls = cls.get_model_cls()
        print(obj.to_dict(t))
        key = await db.fetch_val(sa.select([getkey(model_cls)]))
        if(key is None):
            await db.execute(sa.insert(
                model_cls,
                values=obj.to_dict()
            ))
        else:
            await db.execute(
                sa.update(model_cls)
                .where(getkey(model_cls) == getkey(obj))
                .values(**obj.to_dict())
            )

    @classmethod
    async def delete(cls):
        model_cls = cls.get_model_cls()
        await db.execute(sa.delete(model_cls))

    @classmethod
    async def delete_by(cls, **kwargs) -> None:
        model_cls = cls.get_model_cls()
        conds = pipe(
            kwargs.items(),
            map(lambda x: (getattr(model_cls, x[0]) == x[1])),
            list
        )
        q = sa.delete(model_cls)
        for c in conds:
            q = q.where(c)
        await db.fetch_all(q)

    @classmethod
    async def get_or_none(cls, **kwargs):
        model_cls = cls.get_model_cls()
        q = sa.select([model_cls])
        conds = pipe(
            kwargs.items(),
            map(lambda x: (getattr(model_cls, x[0]) == x[1])),
            list
        )
        for c in conds:
            q = q.where(c)
        res = await db.fetch_one(q)
        if  res is not None:
            return model_cls(**dict(res))
        else:
            return None

    @classmethod
    async def filter_by(cls, **kwargs):
        model_cls = cls.get_model_cls()
        q = sa.select([model_cls])
        conds = pipe(
            kwargs.items(),
            map(lambda x: (getattr(model_cls, x[0]) == x[1])),
            list
        )
        for c in conds:
            q = q.where(c)
        rows = await db.fetch_all(q)
        return pipe(
            rows,
            map(lambda x: model_cls(**dict(x))),
            list
        )

    @classmethod
    async def filter_in(cls, **kwargs):
        model_cls = cls.get_model_cls()
        q = sa.select([model_cls])
        conds = pipe(
            kwargs.items(),
            map(lambda x: getattr(model_cls, x[0]).in_(x[1])),
            list
        )
        for c in conds:
            q = q.where(c)
        rows = await db.fetch_all(q)
        return pipe(
            rows,
            map(lambda x: model_cls(**dict(x))),
            list
        )

    @classmethod
    async def bulk_insert(cls, objects):
        if len(objects) > 0:
            model_cls = cls.get_model_cls()
            _objects = pipe(
                objects,
                map(lambda x: x if isinstance(x, dict) else x.to_dict()),
                list
            )
            await db.execute(
                sa.insert(model_cls).values(_objects)
            )
        return len(objects)
