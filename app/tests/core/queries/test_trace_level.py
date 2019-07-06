from mlboard.core import queries as qs
from mlboard.core import models as ms
from mlboard.core import db
import pytest
import asyncio
import uuid
from .fixtures import db_scope
from faker import Faker
fake = Faker()


@pytest.fixture(scope='function', autouse=True)
async def prepare():
    async with db.get_conn() as conn:
        await qs.Sensor(conn).delete()
        await qs.TraceLevel(conn).delete()
    yield


@pytest.mark.asyncio
async def test_upsert():
    process = ms.Process(
        name=fake.name(),
        chamber_id=uuid.uuid4(),
        log_define_id=uuid.uuid4(),
        state=2,
    )
    async with db.get_conn() as conn:
        new_id = await qs.Process(conn).upsert(process)
        trace_level = ms.TraceLevel(
            id=new_id,
            warning_level=0,
            error_level=0,
        )
        trace_id = await qs.TraceLevel(conn).upsert(trace_level)
        trace_id = await qs.TraceLevel(conn).get_by(id=trace_level.id)
        assert trace_id is not None
