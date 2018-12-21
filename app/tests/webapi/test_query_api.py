#!/usr/bin/env python
# -*- coding: utf-8 -*-
import pytest
from osca import models as ms
from osca import query as qry
from osca.session import DBSession
import uuid
from cytoolz.curried import pipe, map, filter
from dateutil.parser import parse
import datetime


def setup():
    with DBSession() as sess:
        qry.Notification(session=sess).delete()


@pytest.fixture
def api():
    from osca.webapi.query_api import QueryAPI
    return QueryAPI()


def test_post(api):
    request_payload = {
        "target": "Unit",
        "methods": [
            {"name": "all", "args": [], "kwargs":{}}],
    }
    res = api._post(**request_payload)
    assert len(res) == 2


def test_all_table(api):

    payloads = pipe(dir(ms),
                    map(lambda x: getattr(ms, x)),
                    filter(lambda x: type(x).__name__ == 'DeclarativeMeta'),
                    map(lambda x: {
                        "target": x.__name__,
                        "methods": [
                            {"name": "limit", "args": [1], "kwargs":{}},
                            {"name": "all", "args": [], "kwargs":{}}
                        ],
                    }),
                    list)

    for p in payloads:
        api._post(**p)


def test_filter_by_str(api):
    query_data = {
        "target": "User",
        "methods": [
            {"name": "filter", "args": ["name = 'bbb'"], "kwargs":{}},
            {"name": "all", "args": [], "kwargs":{}},
        ]
    }

    api._post(**query_data)


def test_first_collect_date(api):
    query_data = {
        "target": "Notification",
        "methods": [
            {"name": "first_collect_date", "args": [], "kwargs": {}},
        ]
    }
    collect_date = parse('2017-05-01 13:00:00+09')
    with DBSession() as sess:
        nofi = ms.Notification()
        nofi.id = str(uuid.uuid4())
        nofi.info_id = str(uuid.uuid4())
        nofi.content = {'mock': 'mock'}
        nofi.collect_date = collect_date
        qry.Notification(session=sess).upsert(nofi)

    assert isinstance(api._post(**query_data), datetime.datetime)
    assert api._post(**query_data) == collect_date
