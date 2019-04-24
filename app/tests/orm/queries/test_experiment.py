from mlboard.orm import queries as qs
from mlboard.orm import models as ms
from mlboard.orm import db
import pytest
import asyncio
import uuid
from faker import faker
fake = faker()


def setup():
    loop = asyncio.get_event_loop()
    loop.run_until_complete(db.connect())
    loop.run_until_complete(qs.experiment.delete())


def teardown():
    loop = asyncio.get_event_loop()
    loop.run_until_complete(db.disconnect())


@pytest.mark.asyncio
async def test_upsert_delete():
    row = ms.experiment(
        id=uuid.uuid4(),
        hash=uuid.uuid4(),
        name='foo',
    )
    await qs.experiment.upsert(row)

    rows = await qs.experiment.all()
    assert len(rows) == 1

    await qs.experiment.delete()

    rows = await qs.experiment.all()
    assert len(rows) == 0


@pytest.mark.asyncio
async def test_upsert_update():
    row = ms.experiment(
        id=uuid.uuid4(),
        hash=uuid.uuid4(),
        name='foo',
    )
    await qs.experiment.upsert(row)

    new_name = 'bar'
    row.name = new_name
    await qs.experiment.upsert(row)
    rows = await qs.experiment.all()
    assert rows[0].name == new_name


@pytest.mark.asyncio
async def test_get_or_none():
    row = ms.experiment(
        id=uuid.uuid4(),
        hash=uuid.uuid4(),
        name='foo',
    )
    await qs.experiment.upsert(row)
    res = await qs.experiment.get_or_none(id=row.id)
    assert res.id == row.id


@pytest.mark.asyncio
async def test_filter_by():
    row = ms.experiment(
        id=uuid.uuid4(),
        hash=uuid.uuid4(),
        name='foo',
    )
    await qs.experiment.upsert(row)
    res = await qs.experiment.filter_by(id=row.id)
    assert len(res) == 1
    assert res[0].id == row.id


@pytest.mark.asyncio
async def test_filter_in():
    row = ms.experiment(
        id=uuid.uuid4(),
        hash=uuid.uuid4(),
        name='foo',
    )
    await qs.experiment.upsert(row)
    res = await qs.experiment.filter_in(id=[row.id])
    assert len(res) == 1
    assert res[0].id == row.id


@pytest.mark.asyncio
async def test_bulk_insert():
    row = ms.experiment(
        id=uuid.uuid4(),
        hash=uuid.uuid4(),
        name='foo',
    )
    await qs.experiment.bulk_insert([row])
    rows = await qs.experiment.all()
    assert len(rows) == 1
