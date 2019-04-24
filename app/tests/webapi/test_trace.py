import pytest
from .fixtures import client
import uuid

def test_all(client):
    res = client.get(
        '/trace/filter-by',
        params={
            "experiment_id": uuid.uuid4()
        }
    )
    assert res.status_code == 200

