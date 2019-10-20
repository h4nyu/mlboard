from uuid import UUID, uuid4
import pytest
import asyncio
from faker import Faker
from datetime import datetime
from mlboard.dao.postgresql import Connection
from mlboard.queries.trace import TraceQuery
from mlboard.models.trace import Trace
from mlboard.config import DB_CONN
import uuid
import time
fake = Faker()


@pytest.fixture(scope='function', autouse=True)
async def prepare() -> None:
    async with Connection(DB_CONN) as conn:
        await TraceQuery(conn).delete()


@pytest.mark.asyncio
async def test_upsert() -> None:
    async with Connection(DB_CONN) as conn:
        await TraceQuery(conn).upsert('aaa')
        assert len(await TraceQuery(conn).all()) == 1
        trace_id = await TraceQuery(conn).upsert('bbb')
        assert len(await TraceQuery(conn).all()) == 2
        assert trace_id == await TraceQuery(conn).upsert('bbb')
        assert len(await TraceQuery(conn).all()) == 2
