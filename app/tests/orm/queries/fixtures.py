from mlboard.orm import db
import pytest

@pytest.fixture(scope='function', autouse=True)
async def db_scope():
    await db.connect()
    yield
    await db.disconnect()
