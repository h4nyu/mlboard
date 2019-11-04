import typing as t
from uuid import UUID
from mlboard.models.trace import Trace
from mlboard.queries.protocols import (
    IPointQuery,
    ITraceQuery,
)
from mlboard.dao.postgresql import Connection, IConnection
from mlboard.models.protocols import ITrace
from datetime import datetime


class TraceUsecase:
    def __init__(
        self,
        get_conn: t.Callable[[], Connection],
        trace_query: t.Callable[[IConnection], ITraceQuery],
        point_query: t.Callable[[IConnection], IPointQuery],
    ):
        self.get_conn = get_conn
        self.trace_query = trace_query
        self.point_query = point_query

    async def all(self) -> t.Sequence[ITrace]:
        async with self.get_conn() as conn:
            return await self.trace_query(conn).all()

    async def delete_by(self, id: UUID) -> None:
        async with self.get_conn() as conn:
            async with conn.transaction():
                await self.point_query(conn).delete_by(trace_id=id)
                await self.trace_query(conn).delete_by(id=id)

    async def register(
        self,
        name: str,
        workspace_id: UUID,
    ) -> UUID:
        async with self.get_conn() as conn:
            async with conn.transaction():
                row = await self.trace_query(conn).get_by(name=name, workspace_id=workspace_id)
                if(row is None):
                    new_row = Trace(name=name, workspace_id=workspace_id)
                    await self.trace_query(conn).insert(new_row)
                    return new_row.id
                else:
                    await self.trace_query(conn).update(
                        id=row.id,
                        payload={
                            'name': name,
                            'workspace_id': workspace_id,
                            'updated_at': datetime.now(),
                        }
                    )
                    return row.id
