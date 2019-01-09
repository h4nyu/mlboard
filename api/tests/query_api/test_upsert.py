#!/usr/bin/env python
# -*- coding: utf-8 -*-
import pytest
from mlboard_api import models as ms
from mlboard_api import query as qry
from mlboard_api.session import DBSession
import uuid
from cytoolz.curried import pipe, map, filter
from dateutil.parser import parse
from .fixture import app
import datetime
import uuid


payloads = [
    {
        "target": "Experiment",
        "method": {
            "name": "upsert",
            "args": [],
            "kwargs": {
                "obj": {
                    "id": f"{uuid.uuid4()}",
                    "tag": "mock",
                    "config": {"foo": "bar"},
                }
            }
        },
    },
    {
        "target": "Trace",
        "method": {
            "name": "upsert",
            "args": [],
            "kwargs": {
                "obj": {
                    "id": f"{uuid.uuid4()}",
                    "tag": "mock",
                    "x": 1,
                    "y": 1,
                    "experiment_id": f"{uuid.uuid4()}"
                }
            }
        },
    }
]


def setup():
    with DBSession() as sess:
        qry.Experiment(session=sess).delete()
        qry.Trace(session=sess).delete()


@pytest.mark.parametrize("payload, ", payloads)
def test_upsert(app, payload):
    app.put(
        '/query',
        json=payload
    )
    qry_cls = getattr(qry, payload['target'])

    with DBSession() as sess:
        assert len(qry_cls(session=sess).all()) == 1
