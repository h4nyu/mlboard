import typing as t
from mlboard.queries.protocols import (
    IWorkspaceQuery
)
from mlboard.dao.postgresql import Connection, IConnection
from mlboard.models.protocols import IWorkspace


class WorkspaceUsecase:
    def __init__(
        self,
        get_conn: t.Callable[[], Connection],
        workspace_query: t.Callable[[IConnection], IWorkspaceQuery],
    ):
        self.get_conn = get_conn
        self.workspace_query = workspace_query

    async def all(self) -> t.Sequence[IWorkspace]:
        async with self.get_conn() as conn:
            return await self.workspace_query(conn).all()
