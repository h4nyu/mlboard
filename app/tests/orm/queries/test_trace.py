from cytoolz.curried import pipe, map, first, itemfilter, reduce, partition_all
from dateutil.parser import parse
import random
import pytest
import uuid
import datetime
import time
import asyncio

from mlboard.orm import queries as qs
from mlboard.orm import models as ms
from mlboard.orm import get_conn
from .fixtures import db_scope


@pytest.fixture(scope='function', autouse=True)
async def prepare():
    async with get_conn() as conn:
        await qs.Trace(conn).delete()
        await qs.TracePoint(conn).delete()


@pytest.mark.asyncio
async def test_filter_by_ts():
    trace_id = uuid.uuid4()
    base_ts = parse("2012-10-09T19:00:55Z")
    dummy_rows = pipe(
        range(100),
        map(lambda x: ms.TracePoint(
            trace_id=trace_id,
            x=x,
            y=random.random(),
            ts=base_ts + datetime.timedelta(seconds=x)
        )),
        list,
    )
    async with get_conn() as conn:
        await qs.TracePoint(conn).bulk_insert(dummy_rows)
        queried_rows = await qs.TracePoint(conn).range_by_ts(
            trace_id=trace_id,
            from_date=base_ts,
            to_date=base_ts + datetime.timedelta(seconds=50)
        )
        assert len(queried_rows) == 51


@pytest.mark.asyncio
async def test_bulk_insert_performance():
    ts = datetime.datetime.now()
    trace_id = uuid.uuid4()
    traces = pipe(
        range(100000),
        map(lambda x: ms.TracePoint(
            x=x,
            y=random.random(),
            trace_id=trace_id,
            ts=ts,
        )),
        list
    )

    async def load_chunk(chunk):
        async with get_conn() as conn:
            return await qs.TracePoint(conn).bulk_insert(chunk)

    cors = pipe(
        traces,
        partition_all(50000),
        map(load_chunk),
        list
    )

    start = time.time()
    results = await asyncio.gather(*cors)
    duration = time.time() - start
    print(f'insert rate:{len(traces)/duration}')
