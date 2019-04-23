import pytest
from .fixtures import client
from mlboard.orm import models as ms
from unittest import mock

def test_all(client):
    res = client.get('/experiment/all')
    assert res.status_code == 200
