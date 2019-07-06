import pytest
import uuid
from mlboard.core import models as ms
from .fixtures import client
from dataclasses import asdict


def test_all(client):
    with client:
        res = client.get('/trace-level/all')
    assert res.status_code == 200


def test_get(client):
    with client:
        res = client.get(
            '/trace-level',
            params={
                "id": str(uuid.uuid4())
            }
        )
    assert res.status_code == 200


def test_delete_by(client):
    with client:
        res = client.delete(
            '/trace-level',
            params={
                "id": str(uuid.uuid4())
            }
        )
    assert res.status_code == 200
