import pytest
from .fixtures import client


def test_all(client):
    res = client.post('/experiment/all')
    assert res.status_code == 200
