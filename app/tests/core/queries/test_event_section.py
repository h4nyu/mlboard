from toolz.curried import pipe, map
from dateutil.parser import parse
from mlboard.core import queries as qs
from mlboard.core import models as ms
from mlboard.core import db
from mlboard.config import TZ
from datetime import datetime
import asyncio
import uuid
import pytest
from faker import Faker
from .fixtures import db_scope
fake = Faker()


@pytest.fixture(scope='function', autouse=True)
async def prepare() -> None:
    async with db.get_conn() as conn:
        await qs.EventSection(conn).delete()


@pytest.mark.asyncio
async def test_range_by() -> None:
    chamber_ids = pipe(
        range(3),
        map(lambda _: uuid.uuid4()),
        list,
    )
    event_sections = [
        ms.EventSection(
            chamber_id=chamber_ids[0],
            from_date=parse("2018-01-01T00:01:00+0900"),
            to_date=parse("2018-01-01T00:01:00+0900"),
            status=0,
            code=1,
        ),
        ms.EventSection(
            chamber_id=chamber_ids[1],
            from_date=parse("2018-01-02T00:01:00+0900"),
            to_date=parse("2018-01-02T00:01:00+0900"),
            status=0,
            code=1,
        ),
        ms.EventSection(
            chamber_id=chamber_ids[2],
            from_date=parse("2018-01-03T00:01:00+0900"),
            to_date=parse("2018-01-03T00:01:00+0900"),
            status=0,
            code=1,
        ),
    ]
    async with db.get_conn() as conn:
        await qs.EventSection(conn).bulk_insert(event_sections)
        rows = await qs.EventSection(conn).range_by(
            chamber_ids=[chamber_ids[0], chamber_ids[1]],
            from_date=parse("2018-01-02T00:01:00+0900"),
            to_date=parse("2018-01-03T00:00:00+0900"),
        )
    assert len(rows) == 1
    assert rows[0].chamber_id == chamber_ids[1]
