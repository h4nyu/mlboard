#!/usr/bin/env python
# -*- coding: utf-8 -*-

import osca.models as ms
import osca.query as qry
from osca.session import DBSession
from dateutil.parser import parse
import uuid
from cytoolz.curried import pipe, map
from dateutil import tz


info = ms.AnomalyDetection()
info.id = str(uuid.uuid4())
info.name = 'mock'
info.from_date = parse('1900-05-01 09:00:00+09')

timeseries = ms.Timeseries()
timeseries.id = str(uuid.uuid4())
timeseries.collect_date = parse('1900-05-01 09:02:00+09')
timeseries.info_id = info.id
timeseries.value = 999999

range_task = ms.RangeTarget()
range_task.id = str(uuid.uuid4())
range_task.param_id = info.id
range_task.name = "timeseries"
range_task.param_date = parse('1900-05-01 09:00:00+09')

range_task0 = ms.RangeTarget()
range_task0.id = str(uuid.uuid4())
range_task0.param_id = info.id
range_task0.name = "summary_day"
range_task0.param_date = parse('1900-05-01 09:00:00+09')

feature_summary = ms.FeatureSummary()
feature_summary.id = str(uuid.uuid4())
feature_summary.info_id = info.id
feature_summary.collect_date = parse('1900-05-01 09:00:00+09')

notif = ms.Notification()
notif.id = str(uuid.uuid4())
notif.info_id = info.id
notif.content = {}
notif.collect_date = parse('1900-05-01 09:00:00+09')
notif.interval = 'day'


def setup():
    with DBSession() as sess:
        qry.AnomalyDetection(session=sess).delete()
        qry.Timeseries(session=sess).delete()
        qry.RangeTarget(session=sess).delete()
        qry.FeatureSummary(session=sess).delete()
        qry.Notification(session=sess).delete()
        sess.merge(info)
        sess.merge(timeseries)
        sess.merge(range_task)
        sess.merge(range_task0)
        sess.merge(feature_summary)
        sess.merge(notif)
        sess.commit()


def test_delete_cascade():
    with DBSession() as sess:

        obj = qry.AnomalyDetection(session=sess)\
            .delete_cascade(info.id)

        query_data = qry.AnomalyDetection(session=sess)\
            .filter(ms.AnomalyDetection.id == info.id)\
            .all()
        assert len(query_data) == 0

        query_data = qry.RangeTarget(session=sess)\
            .filter(ms.RangeTarget.param_id == info.id)\
            .all()
        assert len(query_data) == 0

        query_data = qry.Timeseries(session=sess)\
            .filter(ms.Timeseries.info_id == info.id)\
            .all()
        assert len(query_data) == 0

        query_data = qry.FeatureSummary(session=sess)\
            .filter(ms.FeatureSummary.info_id == info.id)\
            .all()
        assert len(query_data) == 0

        query_data = qry.Notification(session=sess)\
            .filter(ms.Notification.info_id == info.id)\
            .all()
        assert len(query_data) == 0


def test_recalc():
    with DBSession() as sess:

        obj = qry.AnomalyDetection(session=sess)\
            .recalc(info)

        query_data = qry.AnomalyDetection(session=sess)\
            .filter(ms.AnomalyDetection.id == info.id)\
            .all()
        assert len(query_data) == 1

        query_data = qry.RangeTarget(session=sess)\
            .filter(ms.RangeTarget.param_id == info.id)\
            .all()
        assert len(query_data) == 0

        query_data = qry.Timeseries(session=sess)\
            .filter(ms.Timeseries.info_id == info.id)\
            .all()
        assert len(query_data) == 0

        query_data = qry.FeatureSummary(session=sess)\
            .filter(ms.FeatureSummary.info_id == info.id)\
            .all()
        assert len(query_data) == 0

        query_data = qry.Notification(session=sess)\
            .filter(ms.Notification.info_id == info.id)\
            .all()
        assert len(query_data) == 0
