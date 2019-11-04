import pytest
from mlboard.dao.postgresql import Connection
from mlboard.queries.trace import TraceQuery
from mlboard.config import DB_CONN


@pytest.fixture(scope='function', autouse=True)
async def prepare() -> None:
    async with Connection(DB_CONN) as conn:
        await TraceQuery(conn).delete()
