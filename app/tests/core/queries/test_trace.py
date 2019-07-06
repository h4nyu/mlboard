from mlboard.core import queries as qs
from mlboard.core import models as ms
from mlboard.core import db
from cytoolz.curried import pipe, map, partition_all
import uuid
import pytest
import asyncio
from faker import Faker
from datetime import datetime, timedelta
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
async def test_range_diff():
    async with db.get_conn() as conn:
        base_ts = datetime.now()
        config_id = uuid.uuid4()
        chamber_id = uuid.uuid4()
        sensor = ms.Sensor(
            id=config_id,
            name='aaa',
            chamber_id=chamber_id,
            col_name='bbb',
            log_define_id=uuid.uuid4(),
        )
        await qs.Sensor(conn).upsert(sensor)

        traces = pipe(
            range(1000),
            map(lambda x: ms.Trace(
                value=x,
                ts=base_ts + timedelta(seconds=x),
                config_id=config_id,
            )),
            list
        )
        config_id = uuid.uuid4()
        traces += pipe(
            range(10000),
            map(lambda x: ms.Trace(
                value=x,
                ts=base_ts + timedelta(seconds=x),
                config_id=config_id,
            )),
            list
        )

        await qs.Trace(conn).bulk_insert(traces)
        rows = await qs.Trace(conn).diff_range_by(
            from_date=base_ts + timedelta(seconds=0),
            to_date=base_ts + timedelta(seconds=100),
            chamber_id=chamber_id,
        )
        assert len(rows) == 1



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
    results = await asyncio.gather(*cors)
    duration = time.time() - start
    print(f'insert rate:{len(traces)/duration}')
