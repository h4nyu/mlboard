from dateutil.parser import parse
from mlboard.core import queries as qs
from mlboard.core import models as ms # type: ignore
from mlboard.core import db # type: ignore
import uuid
import pytest # type: ignore
from faker import Faker # type: ignore
from .fixtures import db_scope # type: ignore
fake = Faker()


@pytest.fixture(scope='function', autouse=True)
async def prepare() -> None:
    async with db.get_conn() as conn:
        await qs.Maintenance(conn).delete()
        await qs.MaintenanceLog(conn).delete()


@pytest.mark.asyncio
async def test_upsert() -> None:
    row = ms.Maintenance(
        name=fake.name(),
        chamber_id=uuid.uuid4(),
    )
    async with db.get_conn() as conn:
        await qs.Maintenance(conn).upsert(row)
        queried_rows = await qs.Maintenance(conn).all()
        assert len(queried_rows) == 1


@pytest.mark.asyncio
async def test_upsert_duplicated() -> None:
    row = ms.Maintenance(
        name=fake.name(),
        chamber_id=uuid.uuid4(),
    )
    async with db.get_conn() as conn:
        await qs.Maintenance(conn).upsert(row)
        row.name = 'hoge'
        await qs.Maintenance(conn).upsert(row)
        queried_rows = await qs.Maintenance(conn).all()
        assert queried_rows == [row]


@pytest.mark.asyncio # type: ignore
async def test_upsert_duplicated():
    row = ms.Maintenance(
        name=fake.name(),
        chamber_id=uuid.uuid4(),
    )
    async with db.get_conn() as conn:
        await qs.Maintenance(conn).upsert(row)
        row.warning_level = 1
        await qs.Maintenance(conn).upsert(row)
        queried_rows = await qs.Maintenance(conn).all()
        assert queried_rows[0].name == row.name
        assert queried_rows[0].chamber_id == row.chamber_id


@pytest.mark.asyncio
async def test_delete_by():
    parent = ms.Maintenance(
        name=fake.name(),
        chamber_id=uuid.uuid4(),
    )
    child = ms.MaintenanceLog(
        maintenance_id=parent.id,
        occurred_date=parse("2018-01-01")
    )
    async with db.get_conn() as conn:
        await qs.Maintenance(conn).upsert(parent)
        await qs.MaintenanceLog(conn).bulk_insert([child])
        await qs.Maintenance(conn).delete_by(id=parent.id)
        assert await qs.Maintenance(conn).all() == []
        assert await qs.MaintenanceLog(conn).all() == []
