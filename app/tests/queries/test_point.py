from cytoolz.curried import pipe, map, partition_all
from uuid import UUID, uuid4
import pytest
import asyncio
from faker import Faker
from datetime import datetime
from mlboard.dao.postgresql import Connection
from mlboard.queries.point import PointQuery
from mlboard.models.point import Point
from mlboard.config import DB_CONN
import uuid
import time
fake = Faker()


@pytest.fixture(scope='function', autouse=True)
async def prepare() -> None:
    async with Connection(DB_CONN) as conn:
        await PointQuery(conn).delete()


@pytest.mark.asyncio
async def test_performance_of_insert() -> None:
    ts = datetime.now()
    trace_id = uuid4()
    points = pipe(
        range(10000),
        map(lambda x: Point(
            value=0,
            ts=ts,
            trace_id=trace_id,
        )),
        list
    )

    async def load_chunk(chunk):
        async with Connection(DB_CONN) as conn:
            return await PointQuery(conn).bulk_insert(chunk)

    cors = pipe(
        points,
        partition_all(2000),
        map(load_chunk),
        list
    )

    start = time.time()
    await asyncio.gather(*cors)
    duration = time.time() - start
    print(f'insert rate:{len(points)/duration}')
