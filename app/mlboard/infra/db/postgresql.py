import typing as t
import asyncpg
import ujson
from types import TracebackType
from .protocols import IConnection, IContextManager


class ContextManager(IContextManager):
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
