import asyncpg
from mlboard.config import DB_URI
import ujson


class Database:
    def __init__(self,
                 url: str,
                 max_size: int = 15):
        self.url = url
        self.is_connected = False
        self._max_size = max_size
        self.pool = None

    async def connect(self):
        """
        Establish the connection pool.
        """
        assert not self.is_connected, "Already connected."
        self.pool = await asyncpg.create_pool(
            self.url,
            max_size=self._max_size,
        )
        self.is_connected = True

    async def disconnect(self) -> None:
        """
        Close all connections in the connection pool.
        """
        assert self.is_connected, "Already disconnected."
        await self.pool.close()
        self.is_connected = False


class Connection:
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

    async def __aenter__(self):
        self._conn = await self._pool.acquire()
        await self.add_codec()
        return self._conn

    async def __aexit__(self, exc_type, exc, tb):
        await self._pool.release(self._conn)


db = Database(DB_URI)


def get_conn():
    return Connection(db.pool)
