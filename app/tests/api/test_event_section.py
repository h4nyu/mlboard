import pytest
import json
import uuid
from datetime import datetime, timedelta
from mlboard import api
from .fixtures import client


def test_search_range(client) -> None:
    with client:
        res = client.get(
            '/event-section/range-by',
            params={
                'chamber_ids': [uuid.uuid4()],
                'from_date': datetime.now().isoformat(),
                'to_date': datetime.now().isoformat(),
            },
        )
        assert res.status_code == 200
