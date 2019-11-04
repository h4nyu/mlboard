from uuid import UUID
from logging import getLogger
import typing as t
from mlboard.models.protocols import IWorkspace
from mlboard.models.workspace import Workspace
from mlboard.dao.protocols import IQuery
from mlboard.dao.postgresql import PostgresqlQuery, IConnection


logger = getLogger("api.query.workspaces")


TABLE_NAME = "workspaces"


def create_model(row: t.Dict[str, t.Any]) -> IWorkspace:
    return Workspace(
        id=row['id'],
        name=row['name'],
        params=row['params'],
        created_at=row['created_at'],
    )


class WorkspaceQuery:
    def __init__(self, conn: IConnection) -> None:
        self._query: IQuery[IWorkspace, UUID] = PostgresqlQuery[IWorkspace, UUID](conn, TABLE_NAME,
                                                                                  create_model,
                                                                                  )

    async def all(self) -> t.Sequence[IWorkspace]:
        return await self._query.all()

    async def delete(self) -> None:
        await self._query.delete()

    async def insert(self, obj: IWorkspace) -> None:
        await self._query.insert(obj)

    async def delete_by(self, **kwargs: t.Any) -> None:
        await self._query.delete_by(**kwargs)

    async def get_by(self, **kwargs: t.Any) -> t.Optional[IWorkspace]:
        return await self._query.get_by(**kwargs)

    async def update(self, id: UUID, payload: t.Dict[str, t.Any]) -> None:
        await self._query.update(key="id", value=id, payload=payload)
