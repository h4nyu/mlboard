import typing as t
import asyncpg
import ujson
from typing_extensions import Protocol
from types import TracebackType


IRecord = t.Dict[str, t.Any]


class IConnection(Protocol):
    async def fetch(self, sql: str, *args: t.Any) -> t.List[IRecord]:
        ...

    async def fetchval(self, sql: str, *args: t.Any) -> t.Optional[t.Any]:
        ...

    async def fetchrow(
            self, sql: str, *args: t.Any) -> t.Optional[IRecord]:
        ...

    async def execute(self, sql: str, *args: t.Any) -> None:
        ...

    async def copy_records_to_table(
            self, table_name: str, columns: t.Iterable[str], records: t.Iterable[t.Tuple]) -> None:
        ...

    async def close(self) -> None:
        ...

    async def set_type_codec(self, *args: t.Any, **kwargs: t.Any) -> None:
        ...

    def transaction(self) -> t.AsyncContextManager:
        ...


class Connection:
    def __init__(self, url: str) -> None:
        self.url = url

    async def __aenter__(self) -> IConnection:
        conn: IConnection = await asyncpg.connect(self.url)
        await conn.set_type_codec(
            'json',
            encoder=ujson.dumps,
            decoder=ujson.loads,
            schema='pg_catalog'
        )
        self._conn = conn
        return conn

    async def __aexit__(
        self,
        exc_type: t.Optional[t.Type[BaseException]],
        exc_value: t.Optional[BaseException],
        traceback: t.Optional[TracebackType]
    ) -> None:
        await self._conn.close()


U = t.TypeVar('U')
T = t.TypeVar('T')


class PostgresqlQuery(t.Generic[T, U]):
    def __init__(
        self, conn: IConnection,
        table_name: str,
        model_factory: t.Callable[[t.Dict], T],
    ) -> None:
        self.conn = conn
        self.table_name = table_name
        self.model_factory = model_factory

    def to_models(self, rows: t.List[IRecord]) -> t.List[T]:
        return [self.to_model(row) for row in rows]

    def to_model(self, row: IRecord) -> T:
        return self.model_factory(row)  # type: ignore

    async def all(self) -> t.List[T]:
        sql = f"""
            SELECT * FROM {self.table_name}
        """
        rows = await self.conn.fetch(sql)
        return self.to_models(rows)

    async def insert(self, obj: T, key="id") -> None:
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

    async def update(self, key: str, value: U, payload: t.Dict[str, t.Any]) -> None:
        map_str = ",".join([f"{k}=${i}" for i, k in enumerate(payload.keys(), start=2)])
        await self.conn.fetchval(
            f"""
                UPDATE {self.table_name}
                SET {map_str}
                WHERE {key} = $1
            """,
            value,
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
