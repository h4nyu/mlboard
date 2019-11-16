import pytest
from mlboard.infra.db.connectors import ContextManager
from mlboard.queries.trace import TraceQuery
from mlboard.models.trace import Trace
from datetime import datetime
from uuid import uuid4


@pytest.fixture(scope='function', autouse=True)
async def prepare() -> None:
    async with ContextManager() as conn:
        await TraceQuery(conn).delete()


@pytest.mark.asyncio
async def test_update_in() -> None:
    async with ContextManager() as conn:
        q = TraceQuery(conn)

        def new_row(x:str) -> Trace: return Trace(
            name=x,
            updated_at=datetime.utcnow(),
            created_at=datetime.utcnow(),
            workspace_id=uuid4(),
        )
        rows = [
            new_row(x)
            for x
            in ['a', 'b', 'c']
        ]
        await q.bulk_insert(rows)

        ids = [
            r.id
            for r
            in rows
        ]

        await q.update(keys=ids, payload={'name': 'd'})
        queried_rows = await q.all()
        for r in queried_rows:
            assert r.name == 'd'
