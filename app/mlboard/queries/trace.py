from cytoolz.curried import map, pipe
from uuid import UUID, uuid4
import time
from logging import getLogger
import typing as t
from profilehooks import profile
from datetime import datetime
from mlboard.models.protocols import ITrace
from mlboard.models.trace import Trace
from mlboard.dao.protocols import IQuery
from mlboard.dao.postgresql import PostgresqlQuery, IConnection


logger = getLogger("api.query.trace")


TABLE_NAME = "traces"


def create_model(row: t.Dict[str, t.Any]) -> ITrace:
    return Trace(
        id=row['id'],
        tag=row['tag'],
        created_at=row['created_at'],
        updated_at=row['updated_at'],
    )


class TraceQuery:
    def __init__(self, conn: IConnection) -> None:
        self._query: IQuery[ITrace, UUID] = PostgresqlQuery[ITrace, UUID](
            conn,
            TABLE_NAME,
            create_model,
        )

    async def all(self) -> t.Sequence[ITrace]:
        return await self._query.all()

    async def delete(self) -> None:
        await self._query.delete()

    async def upsert(self, tag: str) -> UUID:
        conn = self._query.conn
        async with conn.transaction():
            row = await self._query.get_by(tag=tag)
            if(row is None):
                new_row = Trace(tag=tag)
                await self._query.insert(new_row)
                return new_row.id
            else:
                self._query.update(
                    key="id",
                    value=row.id,
                    payload={
                        'tag': tag,
                        'updated_at': datetime.now(),
                    }
                )
                return row.id
