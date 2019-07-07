import typing
import asyncpg
import ujson
import typing as t
from typing_extensions import Protocol
from datetime import datetime
import uuid

IRecord = t.Dict[str, t.Any]


class IConnection(Protocol):
    async def fetch(self, sql: str, *args: t.Any) -> t.List[IRecord]:
        ...

    async def fetchval(self, sql: str, *args: t.Any) -> t.Optional[t.Any]:
        ...

    async def fetchrow(self, sql: str, *args: t.Any) -> t.Optional[IRecord]:
        ...

    async def execute(self, sql: str, *args: t.Any) -> None:
        ...

    async def copy_records_to_table(
        self, table_name: str, columns: t.Iterable[str], records: t.Iterable[t.Tuple]
    ) -> None:
        ...

    def transaction(self) -> t.AsyncContextManager:
        ...


class ConnectionPool:
    def __init__(self, pool):
        self._pool = pool
        self._conn = None

    async def add_codec(self):
        await self._conn.set_type_codec(
            'json',
            encoder=ujson.dumps,
            decoder=ujson.loads,
            schema='pg_catalog'
        )

    async def __aenter__(self) -> IConnection:
        self._conn = await self._pool.acquire()
        await self.add_codec()
        return self._conn

    async def __aexit__(self, exc_type, exc, tb):
        await self._pool.release(self._conn)


class Database:
    def __init__(self,
                 url: str,
                 min_size: int = 5,
                 max_size: int = 10):
        self.url = url
        self.is_connected = False
        self._max_size = max_size
        self._min_size = min_size
        self.pool: t.Optional[t.Any] = None

    async def __aenter__(self):
        await self.connect()

    async def __aexit__(self, exc_type, exc, tb):
        await self.disconnect()

    async def connect(self, loop=None):
        """
        Establish the connection pool.
        """
        assert not self.is_connected, "Already connected."
        self.pool = await asyncpg.create_pool(
            self.url,
            min_size=self._min_size,
            max_size=self._max_size,
            loop=loop,
        )
        self.is_connected = True

    async def disconnect(self) -> None:
        """
        Close all connections in the connection pool.
        """
        assert self.is_connected, "Already disconnected."
        if(self.pool):
            await self.pool.close()
            self.is_connected = False

    def get_conn(self) -> ConnectionPool:
        assert self.is_connected, "Database is not connected."
        return ConnectionPool(self.pool)
