import typing as t
from types import TracebackType
from .protocols import IConnection


class Transaction:
    def __init__(self, conn: IConnection) -> None:
        self.conn = conn

    async def __aenter__(self) -> None:
        stmt = "BEGIN;"
        await self.conn.execute(stmt)

    async def __aexit__(
        self,
        exc_type: t.Optional[t.Type[BaseException]],
        exc_value: t.Optional[BaseException],
        traceback: t.Optional[TracebackType]
    ) -> None:
        if exc_type is not None:
            await self.__rollback()
        else:
            await self.__commit()

    async def __rollback(self) -> None:
        stmt = "ROLLBACK;"
        await self.conn.execute(stmt)

    async def __commit(self) -> None:
        stmt = "COMMIT;"
        await self.conn.execute(stmt)
