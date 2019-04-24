from cytoolz.curried import pipe, map, first, itemfilter, reduce
from dateutil.parser import parse
import random
import pytest
import asyncio
import uuid
import datetime

from mlboard.orm import queries as qs
from mlboard.orm import models as ms
from mlboard.orm import db


def setup():
    loop = asyncio.get_event_loop()
    loop.run_until_complete(db.connect())
    loop.run_until_complete(qs.Trace.delete())
    loop.run_until_complete(qs.TracePoint.delete())


def teardown():
    loop = asyncio.get_event_loop()
    loop.run_until_complete(db.disconnect())


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
    await qs.TracePoint.bulk_insert(dummy_rows)

    queried_rows = await qs.TracePoint.range_by_ts(
        trace_id=trace_id,
        from_date=base_ts,
        to_date=base_ts + datetime.timedelta(seconds=50)
    )
    assert len(queried_rows) == 50
