import pytest
from mlboard.infra.db.connectors import ContextManager
from mlboard.queries.trace import TraceQuery


@pytest.fixture(scope='function', autouse=True)
async def prepare() -> None:
    async with ContextManager() as conn:
        await TraceQuery(conn).delete()
