from mlboard.core import queries as qs
from mlboard.core import enums as es
from mlboard.core.queries.part import get_status
import pytest
import asyncio
from faker import Faker
from .fixtures import db_scope
fake = Faker()


@pytest.mark.parametrize("pre_serials, serial, expected", [
    ([], "", es.StatusLevel.INFO),
    ([], "101", es.StatusLevel.INFO),
    (["101"], "", es.StatusLevel.WARNING),
    (["101"], "101", es.StatusLevel.ERROR),
    (["102"], "101", es.StatusLevel.INFO),
    ([""], "", es.StatusLevel.INFO),
    ([""], "101", es.StatusLevel.WARNING),
    (["", "101"], "102", es.StatusLevel.INFO),
    (["", "101"], "101", es.StatusLevel.ERROR),
])
def test_get_status(pre_serials, serial, expected):
    result = get_status(pre_serials, serial)
    assert result == expected
