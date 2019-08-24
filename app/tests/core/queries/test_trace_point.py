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
async def prepare() -> None:
    async with qs.get_conn() as conn:
        await qs.TracePoint(conn).delete()


@pytest.mark.asyncio
async def test_performance_of_insert() -> None:
    ts = datetime.now()
    tag = 'test'
    traces = pipe(
        range(10000),
        map(lambda x: ms.TracePoint(
            value=0,
            ts=ts,
            tag=tag,
        )),
        list
    )

    async def load_chunk(chunk):
        async with db.get_conn() as conn:
            return await qs.TracePoint(conn).bulk_insert(chunk)

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
