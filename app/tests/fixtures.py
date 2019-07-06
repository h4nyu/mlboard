import pytest
from mlboard.core import db
from logging import getLogger
logger = getLogger("test.fixture")


@pytest.fixture(scope='function', autouse=True)
async def db_scope():
    logger.debug('connect')
    await db.connect()
    yield
    logger.debug('disconnect')
    await db.disconnect()
