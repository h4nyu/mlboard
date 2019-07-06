import pytest
from .fixtures import client


def test_all(client):
    with client:
        res = client.get('/process/all')
    assert res.status_code == 200
