import typing as t
from mlboard.queries.protocols import (
    IWorkspaceQuery,
    ITraceQuery,
    IPointQuery,
    ITransaction,
)
from mlboard.models.protocols import IWorkspace
from mlboard.models.workspace import Workspace
from uuid import UUID


class WorkspaceUsecase:
    def __init__(
        self,
        transaction: ITransaction,
        workspace_query: IWorkspaceQuery,
        trace_query: ITraceQuery,
        point_query: IPointQuery,
    ) -> None:
        self.transaction = transaction
        self.workspace_query = workspace_query
        self.point_query = point_query
        self.trace_query = trace_query

    async def all(self) -> t.Sequence[IWorkspace]:
        return await self.workspace_query.all()

    async def delete_by(self, id: UUID) -> None:
        async with self.transaction:
            await self.workspace_query.delete_by(id=id)
            trace_ids = [
                x.id
                for x
                in await self.trace_query.filter_by(workspace_id=id)
            ]
            await self.trace_query.delete_by(workspace_id=id)
            for x in trace_ids:
                await self.point_query.delete_by(trace_id=x)

    async def register(self, name: str, params: t.Dict[str, t.Any]) -> UUID:
        async with self.transaction:
            row = await self.workspace_query.get_by(name=name)
            if(row is None):
                new_row = Workspace(name=name, params=params)
                await self.workspace_query.insert(new_row)
                return new_row.id
            else:
                await self.workspace_query.update(
                    key='id',
                    value=row.id,
                    payload={
                        'params': params,
                    }
                )
                return row.id
