from cytoolz.curried import pipe, map, first, itemfilter, reduce, partition
from datetime import datetime
from mlboard.core import db
from mlboard.core import models as ms
from mlboard.core import queries as qs
from mlboard.config import DB_CONN
import asyncpg
import asyncio
import uuid
import pytest
import time
from .fixtures import db_scope


@pytest.fixture(scope='function', autouse=True)
async def prepare():
    async with db.get_conn() as conn:
        await qs.Chamber(conn).delete()
    yield


@pytest.mark.asyncio
async def test_all():
    async with db.get_conn() as conn:
        await qs.Chamber(conn).all()


@pytest.mark.asyncio
async def test_upsert() -> None:
    async with db.get_conn() as conn:
        row = ms.Chamber(
            id=uuid.uuid4(),
            name='foo',
            collect_date=datetime.now(),
        )
        await qs.Chamber(conn).upsert(row)
        rows = await qs.Chamber(conn).all()
        assert rows[0].id == row.id
        assert rows[0].name == 'foo'

        row.name = 'bar'
        await qs.Chamber(conn).upsert(row)
        rows = await qs.Chamber(conn).all()
        assert rows[0].id == row.id
        assert rows[0].name == 'bar'
