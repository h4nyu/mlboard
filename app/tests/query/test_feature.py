#!/usr/bin/env python
# -*- coding: utf-8 -*-

import pytest
from dateutil.parser import parse
from dateutil.relativedelta import relativedelta
from cytoolz.curried import pipe, filter, map, concat
from datetime import timedelta
from osca import models as ms
import osca.query as qry
from osca.session import DBSession
from pprint import pprint
from random import randint
import uuid
info_id = 'a5d3fe22-bf99-45ab-83a3-58e926c744be'


@pytest.mark.parametrize("samples, expected", [
    (100, 99),
    (0, None)
])
def test_max(samples, expected):
    from_date = parse('2017-05-01 20:00:00+09')
    to_date = parse('2017-05-10 20:00:00+09')
    span = to_date - from_date

    def new_row(x):
        return ms.EventFeature(
            id=uuid.uuid4().hex,
            collect_date=from_date + span / samples * x,
            value=x,
            event_id=uuid.uuid4().hex,
            info_id=info_id
        )

    rows = pipe(
        range(samples),
        map(new_row), list
    )

    with DBSession() as sess:
        qry.EventFeature(session=sess).bulk_insert(rows)
        sess.commit()
        result = qry.Feature(session=sess).filter_range(
            from_date,
            to_date,
            info_id=info_id
        ).max(ms.Feature.value)

        assert result == expected


@pytest.mark.parametrize("samples, expected", [
    (100, 0),
    (0, None)
])
def test_min(samples, expected):
    from_date = parse('2017-05-01 20:00:00+09')
    to_date = parse('2017-05-10 20:00:00+09')
    span = to_date - from_date

    def new_row(x):
        return ms.EventFeature(
            id=uuid.uuid4().hex,
            collect_date=from_date + span / samples * x,
            value=x,
            event_id=uuid.uuid4(),
            info_id=info_id
        )

    rows = pipe(
        range(samples),
        map(new_row), list
    )

    with DBSession() as sess:
        qry.EventFeature(session=sess).bulk_insert(rows)
        sess.commit()
        result = qry.Feature(session=sess).filter_range(
            from_date,
            to_date,
            info_id=info_id
        ).min(ms.Feature.value)

        assert result == expected


@pytest.mark.parametrize("samples, expected", [
    (100, 29.7),
    (0, None)
])
def test_percentile(samples, expected):
    from_date = parse('2017-05-01 20:00:00+09')
    to_date = parse('2017-05-10 20:00:00+09')
    span = to_date - from_date

    def new_row(x):
        return ms.EventFeature(
            id=uuid.uuid4(),
            collect_date=from_date + span / samples * x,
            value=x,
            event_id=uuid.uuid4(),
            info_id=info_id
        )

    rows = pipe(
        range(samples),
        map(new_row),
        list
    )

    with DBSession() as sess:
        qry.EventFeature(session=sess).bulk_insert(rows)
        sess.commit()
        result = qry.Feature(session=sess).filter_range(
            from_date,
            to_date,
            info_id=info_id
        ).percentile_cont(ms.Feature.value, 0.3)

        assert result == expected


@pytest.mark.parametrize("samples, expected", [
    (100, 49.5),
    (0, None)
])
def test_mean(samples, expected):
    from_date = parse('2017-05-01 20:00:00+09')
    to_date = parse('2017-05-10 20:00:00+09')
    span = to_date - from_date

    def new_row(x):
        return ms.EventFeature(
            id=uuid.uuid4(),
            collect_date=from_date + span / samples * x,
            value=x,
            event_id=uuid.uuid4(),
            info_id=info_id
        )

    rows = pipe(
        range(samples),
        map(new_row), list
    )

    with DBSession() as sess:
        qry.EventFeature(session=sess).bulk_insert(rows)
        sess.commit()
        result = qry.Feature(session=sess).filter_range(
            from_date,
            to_date,
            info_id=info_id
        ).mean(ms.Feature.value)

        assert result == expected


def teardown():
    with DBSession() as sess:
        qry.EventFeature(session=sess).delete()
        sess.commit()
