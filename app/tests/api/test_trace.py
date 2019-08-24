import datetime
import uuid
from .fixtures import client  # noqa: F401;


def test_all(client):
    with client:
        res = client.get(
            '/trace/range-by',
            params={
                'tag': 'aaa',
                'from_date': datetime.datetime.now().isoformat(),
                'to_date': datetime.datetime.now().isoformat(),
            }
        )
    assert res.status_code == 200
