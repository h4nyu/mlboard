import typing as t
from .protocols import IRecord, IConnection

U = t.TypeVar('U')
T = t.TypeVar('T')


class ModelQuery(t.Generic[T, U]):
    conn: IConnection
    table_name: str

    def __init__(
        self, conn: IConnection,
        table_name: str,
        to_model: t.Callable[[IRecord], T],
    ) -> None:
        self.conn = conn
        self.table_name = table_name
        self.to_model = to_model  # type: ignore

    def to_models(self, rows: t.Sequence[IRecord]) -> t.Sequence[T]:
        return [self.to_model(row) for row in rows]

    @staticmethod
    def to_model(row: IRecord) -> T: ...

    async def all(self) -> t.Sequence[T]:
        sql = f"""
            SELECT * FROM {self.table_name}
        """
        rows = await self.conn.fetch(sql)
        return self.to_models(rows)

    async def insert(self, obj: T) -> None:
        prop_dict = obj.__dict__
        keys = prop_dict.keys()
        keys_str = ",".join(keys)
        value_map_str = ",".join(
            [f"${i}" for i, _ in enumerate(keys, start=1)])
        values = prop_dict.values()
        await self.conn.fetchval(
            f"""
                INSERT INTO {self.table_name}({keys_str})
                VALUES ({value_map_str})
            """,
            *values
        )

    async def update(self, keys: t.Sequence[U], payload: t.Dict[str, t.Any]) -> None:
        key_len = len(keys)
        if key_len == 0:
            return None
        key_stmt = ",".join([f"${i+1}" for i in range(key_len)])
        map_stmt = ",".join([f"{k}=${i+1}" for i, k in enumerate(payload.keys(), start=key_len)])
        await self.conn.fetchval(
            f"""
                UPDATE {self.table_name}
                SET {map_stmt}
                WHERE id IN ({key_stmt})
            """,
            *keys,
            *payload.values(),
        )

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
            TRUNCATE TABLE {self.table_name}
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

    async def filter_by(self, **kwargs: t.Any) -> t.Sequence[T]:
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

    async def bulk_insert(self, objects: t.Sequence[T]) -> int:
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

    async def count_by(self, **kwargs: t.Any) -> int:
        map_str = " AND ".join(
            [f"{k}=${i}" for i, k in enumerate(kwargs.keys(), start=1)])
        values = kwargs.values()
        where_stmt = f"WHERE {map_str}" if len(values) else ""
        sql = f"""
            SELECT COUNT(*) FROM {self.table_name}
            {where_stmt}
        """
        result = await self.conn.fetchval(
            sql,
            *values
        )
        if isinstance(result, int):
            return result
        else:
            return 0
