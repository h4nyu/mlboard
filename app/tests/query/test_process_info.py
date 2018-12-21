#!/usr/bin/env python
# -*- coding: utf-8 -*-

import osca.models as ms
import osca.query as qry
from osca.session import DBSession
from dateutil.parser import parse
import uuid
from cytoolz.curried import pipe, map
from dateutil import tz


info_id = '004bb294-ec01-4919-9c04-9ad8a004552d'
info = ms.ProcessInfo()
info.id = info_id
info.name = 'mock'
info.unit_id = 1
info.timeout = 10
info.start_device_id = 1
info.end_device_id = 1
info.from_date = parse('1900-05-01 09:00:00+09')

process = ms.Process()
process.id = str(uuid.uuid4())
process.start_date = parse('1900-05-01 09:02:00+09')
process.end_date = parse('1900-05-01 09:03:00+09')
process.info_id = info.id
process_table_name = 'process_004bb294ec0149199c049ad8a004552d_1900_05'

range_task0 = ms.RangeTarget()
range_task0.id = '004bb294-ec01-4919-9c04-9ad8a004554d'
range_task0.param_id = info_id
range_task0.name = "mock"
range_task0.param_date = parse('1900-05-01 09:00:00+09')

process_feature_info = ms.ProcessFeatureInfo()
process_feature_info.name = 'mock'
process_feature_info.id = '104bb294-ec01-4919-9c04-9ad8a004552d'
process_feature_info.process_info_id = info.id
process_feature_info.calc_model = {}


process_feature = ms.ProcessFeature()
process_feature.info_id = process_feature_info.id
process_feature.process_id = process.id
process_feature.id = str(uuid.uuid4())
process_feature.collect_date = parse('1900-05-01 09:00:00+09')
process_feature.value = 9999

range_task1 = ms.RangeTarget()
range_task1.id = '201bb294-ec01-4919-9c04-9ad8a004554d'
range_task1.param_id = process_feature_info.id
range_task1.name = "mock"
range_task1.param_date = parse('1900-05-01 09:00:00+09')

feature_summary = ms.FeatureSummary()
feature_summary.id = '201bb294-ec01-4919-9c04-9ad8a004554d'
feature_summary.interval = 'day'
feature_summary.info_id = process_feature_info.id
feature_summary.collect_date = parse('1900-05-01 09:00:00+09')


def setup():
    with DBSession() as sess:
        sess.merge(info)
        sess.merge(process)
        sess.merge(range_task0)
        sess.merge(range_task1)
        sess.merge(process_feature_info)
        sess.merge(process_feature)
        sess.merge(feature_summary)
        sess.commit()


def test_delete_cascade():
    with DBSession() as sess:

        obj = qry.ProcessInfo(session=sess)\
            .delete_cascade(info.id)

        query_data = qry.ProcessInfo(session=sess)\
            .filter(ms.ProcessInfo.id == info.id)\
            .all()
        assert len(query_data) == 0

        query_data = qry.RangeTarget(session=sess)\
            .filter(ms.RangeTarget.param_id == info.id)\
            .all()
        assert len(query_data) == 0

        query_data = qry.RangeTarget(session=sess)\
            .filter(ms.RangeTarget.param_id == process_feature_info.id)\
            .all()
        assert len(query_data) == 0

        query_data = qry.Process(session=sess)\
            .filter(ms.Process.info_id == info_id)\
            .all()
        assert len(query_data) == 0

        query_data = qry.ProcessFeatureInfo(session=sess)\
            .filter(ms.ProcessFeatureInfo.id == process_feature_info.id)\
            .all()
        assert len(query_data) == 0

        query_data = qry.ProcessFeature(session=sess)\
            .filter(ms.ProcessFeature.info_id == process_feature_info.id)\
            .all()
        assert len(query_data) == 0

        query_data = qry.FeatureSummary(session=sess)\
            .filter(ms.FeatureSummary.info_id == process_feature_info.id)\
            .all()
        assert len(query_data) == 0


def test_recalc():
    with DBSession() as sess:

        obj = qry.ProcessInfo(session=sess)\
            .recalc(info)

        query_info = qry.ProcessInfo(session=sess)\
            .get(obj.id)

        assert str(query_info.id) == info_id

        query_data = qry.RangeTarget(session=sess)\
            .filter(ms.RangeTarget.param_id == info.id)\
            .all()

        assert len(query_data) == 0

        query_data = qry.RangeTarget(session=sess)\
            .filter(ms.RangeTarget.param_id == process_feature_info.id)\
            .all()
        assert len(query_data) == 0

        query_data = qry.Process(session=sess)\
            .filter(ms.Process.info_id == info_id)\
            .all()
        assert len(query_data) == 0

        query_data = qry.ProcessFeatureInfo(session=sess)\
            .filter(ms.ProcessFeatureInfo.id == process_feature_info.id)\
            .all()
        assert len(query_data) == 1

        query_data = qry.ProcessFeature(session=sess)\
            .filter(ms.ProcessFeature.info_id == process_feature_info.id)\
            .all()
        assert len(query_data) == 0

        query_data = qry.FeatureSummary(session=sess)\
            .filter(ms.FeatureSummary.info_id == process_feature_info.id)\
            .all()
        assert len(query_data) == 0
