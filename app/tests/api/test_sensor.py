import pytest
from mlboard import api
from .fixtures import client


def test_all(client):
    with client:
        res = client.get('/sensor/all')
    assert res.status_code == 200
