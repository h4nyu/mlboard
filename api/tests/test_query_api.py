#!/usr/bin/env python
# -*- coding: utf-8 -*-
import pytest
from mlboard_api import models as ms
from mlboard_api import query as qry
from mlboard_api.session import DBSession
import uuid
from cytoolz.curried import pipe, map, filter
from dateutil.parser import parse
import datetime


@pytest.fixture
def api():
    from mlboard_api.webapi import QueryAPI
    return QueryAPI()


@pytest.fixture(params=pipe(
    dir(ms),
    map(lambda x: getattr(ms, x)),
    filter(lambda x: type(x).__name__ == 'DeclarativeMeta'),
    list
))
def target(request):
    return request.param


def test_all_table(api, target):
    payload = {
        "target": target.__name__,
        'entities': [],
        "methods": [
            {"name": "limit", "args": [1], "kwargs":{}},
            {"name": "all", "args": [], "kwargs":{}}
        ],
    }

    api._post(**payload)
