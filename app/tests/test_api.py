from datetime import datetime
from uuid import uuid4
from starlette.testclient import TestClient
from .fixtures import client  # noqa: F401
from uuid import uuid4


def test_trace_all(client: TestClient) -> None:
    with client:
        res = client.get(
            '/trace/all',
        )
    assert res.status_code == 200


def test_trace_register(client: TestClient) -> None:
    with client:
        res = client.post(
            '/trace',
            json={
                'name': 'aaa',
                'workspace_id': str(uuid4())
            }
        )
    assert res.status_code == 200


def test_trace_delete(client: TestClient) -> None:
    with client:
        res = client.delete(
            '/trace',
            params={
                'id': str(uuid4())
            }
        )
    assert res.status_code == 200


def test_point_range_by(client: TestClient) -> None:
    with client:
        res = client.get(
            '/point/range-by',
            params={
                'trace_id': str(uuid4()),
                'from_date': datetime.now().isoformat(),
                'to_date': datetime.now().isoformat(),
            }
        )
    assert res.status_code == 200


def test_workspace_all(client: TestClient) -> None:
    with client:
        res = client.get(
            '/workspace/all'
        )
    assert res.status_code == 200
