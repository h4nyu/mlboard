#!/usr/bin/env python
# -*- coding: utf-8 -*-
import pytest
from mlboard_api import models as ms
from mlboard_api import queries as qs
import uuid
from cytoolz.curried import pipe, map, filter
from dateutil.parser import parse
from .fixture import app
import datetime
import uuid


def setup():
    qs.Experiment().delete()


def test_insert_update(app):

    # insert
    payload = {
        "target": "Experiment",
        "method": {
            "name": "upsert",
            "args": [],
            "kwargs": {
                "obj": {
                    "tag": "mock",
                    "config": {"foo": "bar"},
                }
            }
        },
    }

    res = app.put(
        '/query',
        json=payload
    )

    qry_cls = getattr(qs, payload['target'])
    inserted_row = qry_cls().get(res.json['id'])
    assert inserted_row is not None
    assert inserted_row.config['foo'] == 'bar'

    # then upsert
    payload = {
        "target": "Experiment",
        "method": {
            "name": "upsert",
            "args": [],
            "kwargs": {
                "obj": {
                    "id": inserted_row.id,
                    "tag": "mock",
                    "config": {"foo": "baz"},
                }
            }
        },
    }

    res = app.put(
        '/query',
        json=payload
    )
    updated_row = qry_cls().get(res.json['id'])
    assert updated_row is not None
    assert updated_row.config['foo'] == 'baz'
