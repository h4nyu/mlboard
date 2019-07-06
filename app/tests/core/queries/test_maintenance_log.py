from mlboard.core import queries as qs
from mlboard.core import models as ms
from mlboard.core import db
from cytoolz.curried import pipe, map
from mlboard.config import TZ
import uuid
from datetime import datetime, timedelta
import pytest
from faker import Faker
from .fixtures import db_scope
fake = Faker()


@pytest.fixture(scope='function', autouse=True)
async def prepare():
    async with db.get_conn() as conn:
        await qs.MaintenanceLog(conn).delete()
    yield


@pytest.mark.asyncio
async def test_filter_in():
    num_samples = 10
    maintenance_id = uuid.uuid4()
    logs = pipe(
        range(num_samples),
        map(lambda _: ms.MaintenanceLog(
            maintenance_id=maintenance_id,
            occurred_date=datetime.now(TZ),
        )),
        list
    )
    async with db.get_conn() as conn:
        await qs.MaintenanceLog(conn).bulk_insert(logs)
        queried_rows = (
            await qs.MaintenanceLog(conn)
            .filter_in(maintenace_ids=[maintenance_id])
        )
        assert len(queried_rows) == len(logs)


@pytest.mark.asyncio
async def test_get_lasts():
    num_samples = 10
    maintenance_id = uuid.uuid4()
    base_ts = datetime.now(TZ)
    logs = pipe(
        range(num_samples),
        map(lambda x: ms.MaintenanceLog(
            maintenance_id=maintenance_id,
            occurred_date=base_ts + timedelta(seconds=x),
        )),
        list
    )
    async with db.get_conn() as conn:
        await qs.MaintenanceLog(conn).bulk_insert(logs)
        queried_rows = (
            await qs.MaintenanceLog(conn).get_lasts()
        )
        assert queried_rows[0].id == logs[-1].id
