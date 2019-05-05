from mlboard.orm import queries as qs
from mlboard.orm import models as ms
from mlboard.orm import db, get_conn
import pytest
import asyncio
import uuid
from faker import Faker
from .fixtures import db_scope
fake = Faker()


@pytest.mark.asyncio
async def test_upsert_delete():
    row = ms.Experiment(
        name='foo',
        config={'aaa': 'bbb'}
    )
    async with get_conn() as conn:
        queried_id = await qs.Experiment(conn).upsert(row)
        rows = await qs.Experiment(conn).all()
        assert len(rows) == 1
        await qs.Experiment(conn).delete()
        rows = await qs.Experiment(conn).all()
        assert len(rows) == 0
