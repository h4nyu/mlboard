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
        await qs.Chamber(conn).delete()
    yield


@pytest.mark.asyncio
async def test_upsert_delete():
    row = ms.Chamber(
        id=uuid.uuid4(),
        name='foo',
    )
    async with db.get_conn() as conn:
        await qs.Chamber(conn).upsert(row)

        rows = await qs.Chamber(conn).all()
        assert len(rows) == 1

        await qs.Chamber(conn).delete()

        rows = await qs.Chamber(conn).all()
        assert len(rows) == 0


@pytest.mark.asyncio
async def test_upsert_update():
    row = ms.Chamber(
        id=uuid.uuid4(),
        name='foo',
    )

    async with db.get_conn() as conn:
        await qs.Chamber(conn).upsert(row)
        await qs.Chamber(conn).upsert(row)
        rows = await qs.Chamber(conn).all()


@pytest.mark.asyncio
async def test_get_by():
    async with db.get_conn() as conn:
        row = ms.Chamber(
            id=uuid.uuid4(),
            name='foo',
        )
        await qs.Chamber(conn).upsert(row)
        res = await qs.Chamber(conn).get_by(id=row.id)
        assert res.id == row.id


@pytest.mark.asyncio
async def test_filter_by():
    async with db.get_conn() as conn:
        row = ms.Chamber(
            id=uuid.uuid4(),
            name="foo",
        )
        await qs.Chamber(conn).upsert(row)
        res = await qs.Chamber(conn).filter_by(id=row.id)
        assert len(res) == 1
        assert res[0].id == row.id
