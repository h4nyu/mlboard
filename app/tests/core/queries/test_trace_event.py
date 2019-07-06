from mlboard.core import queries as qs
from mlboard.core import models as ms
from mlboard.core import db
from mlboard.core import enums as es
import pytest
import asyncio
import uuid
from .fixtures import db_scope
from dateutil.parser import parse
from faker import Faker
fake = Faker()


@pytest.fixture(scope='function', autouse=True)
async def prepare() -> None:
    async with db.get_conn() as conn:
        await qs.TraceEvent(conn).delete()
        await qs.Sensor(conn).delete()


@pytest.mark.asyncio
async def test_range_in() -> None:
    async with db.get_conn() as conn:
        chamber_id = uuid.uuid4()
        sensor = ms.Sensor(
            id=uuid.uuid4(),
            chamber_id=chamber_id,
            log_define_id=uuid.uuid4(),
            name='aaa',
            col_name='bbb',
        )
        events =  [
            ms.TraceEvent(
                config_id=sensor.id,
                name=es.TraceEventName.ABOVE_ERROR,
                occurred_date=parse('2019-01-01T01:00:00+0900')
            ),
            ms.TraceEvent(
                config_id=uuid.uuid4(),
                name=es.TraceEventName.ABOVE_ERROR,
                occurred_date=parse('2019-01-02T01:00:00+0900')
            ),
            ms.TraceEvent(
                config_id=uuid.uuid4(),
                name=es.TraceEventName.ABOVE_ERROR,
                occurred_date=parse('2019-01-02T01:00:00+0900')
            ),
        ]
        await qs.TraceEvent(conn).bulk_insert(events)
        await qs.Sensor(conn).upsert(sensor)

        rows = await qs.TraceEvent(conn).range_in(
            from_date=parse('2019-01-01T00:00:00+0900'),
            to_date=parse('2019-01-02T00:00:00+0900'),
            chamber_ids=[chamber_id],
        )
        assert len(rows) == 1
