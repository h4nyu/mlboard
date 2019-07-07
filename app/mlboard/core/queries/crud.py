from cytoolz.curried import pipe, map, first, itemfilter, reduce, curry
import typing as t
from typing_extensions import Protocol
from collections import namedtuple
from mlboard.core.database import IConnection
from ..database import IRecord
import uuid

U = t.TypeVar('U')
T = t.TypeVar('T')


class Crud:
    def __init__(
        self, conn: IConnection,
        table_name: str,
        model_factory: t.Type[T],
        id_cls: t.Type[U],
    ) -> None:
        self.conn = conn
        self.table_name = table_name
        self.model_factory = model_factory
        self.id_type = id_cls

    def to_models(self, rows: t.List[IRecord]) -> t.List[T]:
        return [self.to_model(row) for row in rows]

    def to_model(self, row: IRecord) -> T:
        return self.model_factory(**row)  # type: ignore

    async def all(self) -> t.List[T]:
        sql = f"""
            SELECT * FROM {self.table_name}
        """
        rows = await self.conn.fetch(sql)
        return self.to_models(rows)

    async def insert(self, obj: T) -> t.Optional[U]:
        prop_dict = obj.__dict__
        keys = prop_dict.keys()
        keys_str = ",".join(keys)
        value_map_str = ",".join(
            [f"${i}" for i, _ in enumerate(keys, start=1)])
        values = prop_dict.values()
        queried_id = await self.conn.fetchval(
            f"""
                INSERT INTO {self.table_name}({keys_str})
                VALUES ({value_map_str})
                RETURNING id
            """,
            *values
        )
        return queried_id

    async def update(self, id: U, **kwargs) -> t.Optional[U]:
        keys = kwargs.keys()
        map_str = ",".join([f"{k}=${i}" for i, k in enumerate(keys, start=2)])
        queried_id = await self.conn.fetchval(
            f"""
                UPDATE {self.table_name}
                SET {map_str}
                WHERE id = $1
                RETURNING {self.table_name}.id
            """,
            id,
            *kwargs.values(),
        )
        return queried_id

    async def get_by(self, **kwargs: t.Any) -> t.Optional[T]:
        map_str = " AND ".join(
            [f"{k}=(${i})" for i, k in enumerate(kwargs.keys(), start=1)])
        values = kwargs.values()
        sql = f"""
            SELECT * FROM {self.table_name}
            WHERE {map_str}
        """
        row = await self.conn.fetchrow(
            sql,
            *values,
        )
        if row is not None:
            return self.to_model(row)
        else:
            return None

    async def delete(self) -> None:
        sql = f"""
            DELETE FROM {self.table_name}
        """
        await self.conn.execute(sql)

    async def delete_by(self, **kwargs: t.Dict[str, t.Any]) -> None:
        map_str = " AND ".join(
            [f"{k}=(${i})" for i, k in enumerate(kwargs.keys(), start=1)])
        values = kwargs.values()
        sql = f"""
                DELETE FROM {self.table_name}
                WHERE {map_str}
        """
        await self.conn.execute(
            sql,
            *values,
        )

    async def filter_by(self, **kwargs: t.Any) -> t.List[T]:
        map_str = " AND ".join(
            [f"{k}=(${i})" for i, k in enumerate(kwargs.keys(), start=1)])
        sql = f"""
            SELECT * FROM {self.table_name}
            WHERE {map_str}
        """
        rows = await self.conn.fetch(
            sql,
            *kwargs.values()
        )
        return self.to_models(rows)

    async def bulk_insert(self, objects: t.List[T]) -> int:
        if len(objects) > 0:
            dicts = [o.__dict__ for o in objects]
            header_dict = dicts[0]
            columns = header_dict.keys()
            records = [tuple(o.values()) for o in dicts]
            await self.conn.copy_records_to_table(
                self.table_name,
                columns=columns,
                records=records
            )
            return len(objects)
        else:
            return 0
