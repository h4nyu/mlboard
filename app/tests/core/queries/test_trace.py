from mlboard.core import queries as qs
from mlboard.core import models as ms
from mlboard.core import db
from cytoolz.curried import pipe, map, partition_all
import uuid
import pytest
import asyncio
from faker import Faker
from datetime import datetime
import uuid
import time
from .fixtures import db_scope
fake = Faker()


@pytest.fixture(scope='function', autouse=True)
async def prepare():
    async with db.get_conn() as conn:
        await qs.Trace(conn).delete()
        await qs.Sensor(conn).delete()


@pytest.mark.asyncio
async def test_performance_of_insert():
    ts = datetime.now()
    config_id = uuid.uuid4()
    traces = pipe(
        range(10000),
        map(lambda x: ms.Trace(
            value=0,
            ts=ts,
            config_id=config_id,
        )),
        list
    )

    async def load_chunk(chunk):
        async with db.get_conn() as conn:
            return await qs.Trace(conn).bulk_insert(chunk)

    cors = pipe(
        traces,
        partition_all(2000),
        map(load_chunk),
        list
    )

    start = time.time()
    await asyncio.gather(*cors)
    duration = time.time() - start
    print(f'insert rate:{len(traces)/duration}')
