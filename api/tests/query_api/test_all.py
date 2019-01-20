#!/usr/bin/env python
# -*- coding: utf-8 -*-
import pytest
from mlboard_api import models as ms
from mlboard_api import queries as qs
from mlboard_api import create_app
import uuid
from cytoolz.curried import pipe, map, filter
from dateutil.parser import parse
import datetime
import uuid
from .fixture import app


@pytest.fixture(params=pipe(
    qs.__all__,
    map(lambda x: getattr(qs, x)),
    list
))
def target(request):
    return request.param


def test_all_table(app, target):
    payload = {
        "target": target.__name__,
        'entities': [],
        "methods": [
            {"name": "limit", "args": [1], "kwargs":{}},
            {"name": "all", "args": [], "kwargs":{}}
        ],
    }
    res = app.post(
        '/query',
        json=payload
    )
    print(res.json)


def test_query_experiment(app):
    info_id = uuid.uuid4()
    experiment = ms.Experiment(
        id=info_id,
        tag=f"{uuid.uuid4()}",
    )
    qs.Experiment().upsert(experiment)

    payload = {
        "target": ms.Experiment.__name__,
        'entities': [],
        "methods": [
            {"name": "filter_by", "args": [], "kwargs":{"tag": experiment.tag}},
            {"name": "first", "args": [], "kwargs":{}}
        ],
    }

    res = app.post(
        '/query',
        json=payload
    )
    assert res.json['tag'] == experiment.tag
