import typing as t
from uuid import UUID
from mlboard.models.trace import Trace
from mlboard.queries.protocols import (
    IPointQuery,
    ITraceQuery,
    ITransaction,
)
from mlboard.models.protocols import ITrace


class TraceUsecase:
    def __init__(
        self,
        transaction: ITransaction,
        trace_query: ITraceQuery,
        point_query: IPointQuery,
    ):
        self.transaction = transaction
        self.trace_query = trace_query
        self.point_query = point_query

    async def all(self) -> t.Sequence[ITrace]:
        return await self.trace_query.all()

    async def delete_by(self, id: UUID) -> None:
        async with self.transaction:
            await self.point_query.delete_by(trace_id=id)
            await self.trace_query.delete_by(id=id)

    async def register(
        self,
        name: str,
        workspace_id: UUID,
    ) -> UUID:
        async with self.transaction:
            row = await self.trace_query.get_by(name=name, workspace_id=workspace_id)
            if(row is None):
                new_row = Trace(name=name, workspace_id=workspace_id)
                await self.trace_query.insert(new_row)
                return new_row.id
            else:
                await self.trace_query.update(
                    keys=[row.id],
                    payload={
                        'name': name,
                        'workspace_id': workspace_id,
                    }
                )
                return row.id
