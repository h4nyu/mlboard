#!/usr/bin/env python
# -*- coding: utf-8 -*-
import pytest
from mlboard_api import models as ms
from mlboard_api import query as qry
from mlboard_api import create_app
import uuid
from cytoolz.curried import pipe, map, filter
from dateutil.parser import parse
import datetime
import uuid
from .fixture import app


@pytest.fixture(params=pipe(
    dir(ms),
    map(lambda x: getattr(ms, x)),
    filter(lambda x: type(x).__name__ == 'DeclarativeMeta'),
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
    app.post(
        '/query',
        json=payload
    )
