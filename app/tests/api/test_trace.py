import pytest
import datetime
import uuid
from mlboard.core import models as ms
from mlboard.core import db
from .fixtures import client


def test_all(client):
    with client:
        res = client.get(
            '/trace/range-by',
            params={
                'id': uuid.uuid4(),
                'from_date': datetime.datetime.now().isoformat(),
                'to_date': datetime.datetime.now().isoformat(),
            }
        )
    assert res.status_code == 200
