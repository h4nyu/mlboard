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


def setup():
    with DBSession() as sess:
        qry.FeatureSummary(session=sess).delete()
        qry.ConditionSummary(session=sess).delete()
        sess.commit()


@pytest.mark.parametrize("samples, expected, query_cls, model_cls", [
    (100, 100, qry.FeatureSummary, ms.FeatureSummary),
    (100, 100, qry.ConditionSummary, ms.ConditionSummary),
])
def test_feature_summary_search_range(samples, expected, query_cls, model_cls):
    from_date = parse('2017-05-01 20:00:00+09')
    to_date = parse('2017-05-10 20:00:00+09')
    span = to_date - from_date
    info_id = str(uuid.uuid4())
    interval = 'hour'

    def new_row(x):
        return model_cls(
            id=str(uuid.uuid4()),
            info_id=info_id,
            collect_date=from_date + span / samples * x,
            interval=interval,
        )
    rows = pipe(
        range(samples),
        map(new_row),
        list
    )

    with DBSession() as sess:
        query_cls(session=sess).bulk_insert(rows)
        sess.commit()
        query_rows = query_cls(session=sess).search_range(
            from_date=from_date,
            to_date=to_date,
            info_id=info_id,
            interval=interval,
        )
        assert len(query_rows) == expected
        assert from_date <= query_rows[0].collect_date
        assert to_date > query_rows[-1].collect_date
