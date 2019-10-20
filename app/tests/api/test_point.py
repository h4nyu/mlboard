import datetime
from uuid import uuid4
from .fixtures import client  # noqa: F401;


def test_all(client):
    with client:
        res = client.get(
            '/trace/range-by',
            params={
                'trace_id': str(uuid4()),
                'from_date': datetime.datetime.now().isoformat(),
                'to_date': datetime.datetime.now().isoformat(),
            }
        )
    assert res.status_code == 200
