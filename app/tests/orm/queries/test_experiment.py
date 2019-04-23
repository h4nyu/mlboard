from mlboard.orm import queries as qs
from mlboard.orm import models as ms
from mlboard.orm import db
import pytest
import asyncio
import uuid
from faker import Faker
fake = Faker()


def setup():
    loop = asyncio.get_event_loop()
    loop.run_until_complete(db.connect())
    loop.run_until_complete(qs.Experiment.delete())


def teardown():
    loop = asyncio.get_event_loop()
    loop.run_until_complete(db.disconnect())


@pytest.mark.asyncio
async def test_upsert_delete():
    row = ms.Experiment(
        id=uuid.uuid4(),
        hash=uuid.uuid4(),
        name='foo',
    )
    await qs.Experiment.upsert(row)

    rows = await qs.Experiment.all()
    assert len(rows) == 1

    await qs.Experiment.delete()

    rows = await qs.Experiment.all()
    assert len(rows) == 0


@pytest.mark.asyncio
async def test_upsert_update():
    row = ms.Experiment(
        id=uuid.uuid4(),
        hash=uuid.uuid4(),
        name='foo',
    )
    await qs.Experiment.upsert(row)

    new_name = 'bar'
    row.name = new_name
    await qs.Experiment.upsert(row)
    rows = await qs.Experiment.all()
    assert rows[0].name == new_name


@pytest.mark.asyncio
async def test_get_or_none():
    row = ms.Experiment(
        id=uuid.uuid4(),
        hash=uuid.uuid4(),
        name='foo',
    )
    await qs.Experiment.upsert(row)
    res = await qs.Experiment.get_or_none(id=row.id)
    assert res.id == row.id


@pytest.mark.asyncio
async def test_filter_by():
    row = ms.Experiment(
        id=uuid.uuid4(),
        hash=uuid.uuid4(),
        name='foo',
    )
    await qs.Experiment.upsert(row)
    res = await qs.Experiment.filter_by(id=row.id)
    assert len(res) == 1
    assert res[0].id == row.id


@pytest.mark.asyncio
async def test_filter_in():
    row = ms.Experiment(
        id=uuid.uuid4(),
        hash=uuid.uuid4(),
        name='foo',
    )
    await qs.Experiment.upsert(row)
    res = await qs.Experiment.filter_in(id=[row.id])
    assert len(res) == 1
    assert res[0].id == row.id


@pytest.mark.asyncio
async def test_bulk_insert():
    row = ms.Experiment(
        id=uuid.uuid4(),
        hash=uuid.uuid4(),
        name='foo',
    )
    await qs.Experiment.bulk_insert([row])
    rows = await qs.Experiment.all()
    assert len(rows) == 1
