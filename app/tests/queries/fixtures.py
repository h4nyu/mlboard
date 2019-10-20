import pytest
from mlboard.core import db


@pytest.fixture(scope='function', autouse=True)
async def db_scope():
    await db.connect()
    yield
    await db.disconnect()
