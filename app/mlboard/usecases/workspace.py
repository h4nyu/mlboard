import typing as t
from mlboard.queries.protocols import (
    IWorkspaceQuery,
    ITraceQuery,
    IPointQuery,
)
from mlboard.dao.postgresql import Connection, IConnection
from mlboard.models.protocols import IWorkspace
from mlboard.models.workspace import Workspace
from uuid import UUID


class WorkspaceUsecase:
    def __init__(
        self,
        get_conn: t.Callable[[], Connection],
        workspace_query: t.Callable[[IConnection], IWorkspaceQuery],
        trace_query: t.Callable[[IConnection], ITraceQuery],
        point_query: t.Callable[[IConnection], IPointQuery],
    ):
        self.get_conn = get_conn
        self.workspace_query = workspace_query
        self.point_query = point_query
        self.trace_query = trace_query

    async def all(self) -> t.Sequence[IWorkspace]:
        async with self.get_conn() as conn:
            return await self.workspace_query(conn).all()

    async def delete_by(self, id: UUID) -> None:
        async with self.get_conn() as conn:
            async with conn.transaction():
                await self.workspace_query(conn).delete_by(id=id)
                trace_ids = [
                    x.id
                    for x
                    in await self.trace_query(conn).filter_by(workspace_id=id)
                ]
                await self.trace_query(conn).delete_by(workspace_id=id)
                for x in trace_ids:
                    await self.point_query(conn).delete_by(config_id=x)

    async def register(self, name: str, params: t.Dict[str, t.Any]) -> UUID:
        async with self.get_conn() as conn:
            async with conn.transaction():
                row = await self.workspace_query(conn).get_by(name=name)
                if(row is None):
                    new_row = Workspace(name=name, params=params)
                    await self.workspace_query(conn).insert(new_row)
                    return new_row.id
                else:
                    await self.workspace_query(conn).update(
                        id=row.id,
                        payload={
                            'params': params,
                        }
                    )
                    return row.id
