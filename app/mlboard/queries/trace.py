from uuid import UUID
from logging import getLogger
import typing as t
from mlboard.models.protocols import ITrace
from mlboard.models.trace import Trace
from mlboard.dao.protocols import IQuery
from mlboard.dao.postgresql import PostgresqlQuery, IConnection


logger = getLogger("api.query.trace")


TABLE_NAME = "traces"


def create_model(row: t.Dict[str, t.Any]) -> ITrace:
    return Trace(
        id=row['id'],
        name=row['name'],
        workspace_id=row['workspace_id'],
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

    async def insert(self, row: ITrace) -> None:
        await self._query.insert(row)

    async def update(self, id: UUID, payload: t.Dict[str, t.Any]) -> None:
        await self._query.update(key="id", value=id, payload=payload)

    async def delete(self) -> None:
        await self._query.delete()

    async def delete_by(self, **kwargs: t.Any) -> None:
        await self._query.delete_by(**kwargs)

    async def get_by(self, **kwargs: t.Any) -> t.Optional[ITrace]:
        return await self._query.get_by(**kwargs)

    async def filter_by(self, **kwargs: t.Any) -> t.Sequence[ITrace]:
        return await self._query.filter_by(**kwargs)
