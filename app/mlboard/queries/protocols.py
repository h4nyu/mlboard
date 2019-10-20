import typing as t
from typing_extensions import Protocol
from datetime import datetime
from mlboard.models.protocols import IPoint


ITransaction = t.AsyncContextManager[None]

class IPointQuery(Protocol):
    async def delete(self) -> None:
        ...

    async def range_by( self, tag:str, from_date:datetime, to_date:datetime) -> t.Sequence[IPoint]:
        ...

    async def bulk_insert( self, rows: t.Sequence[IPoint]) -> None:
        ...
