#!/usr/bin/env python
# -*- coding: utf-8 -*-

import osca.models as ms
import osca.query as qry
from osca.session import DBSession
from dateutil.parser import parse
import uuid
from cytoolz.curried import pipe, map


info = ms.EventInfo()
info.id = '004bb294-ec01-4919-9c04-9ad8a004552d'
info.name = 'mock'
info.from_date = parse('1900-05-01 09:00:00+09')
info.unit_id = 1
info.product_device_id = 1
tag = 'mock'

event = ms.Event()
event.id = str(uuid.uuid4())
event.collect_date = parse('1900-05-01 09:00:00+09')
event.info_id = info.id
event_table_name = 'event_004bb294ec0149199c049ad8a004552d_1900_05'

range_task = ms.RangeTarget()
range_task.id = str(uuid.uuid4())
range_task.name = 'mock'
range_task.param_id = info.id

event_feature_info = ms.EventFeatureInfo()
event_feature_info.id = str(uuid.uuid4())
event_feature_info.com_device_id = 1
event_feature_info.event_info_id = info.id

range_task_f = ms.RangeTarget()
range_task_f.id = str(uuid.uuid4())
range_task_f.name = 'mock'
range_task_f.param_id = event_feature_info.id

event_feature = ms.EventFeature()
event_feature.id = str(uuid.uuid4())
event_feature.collect_date = parse('1900-05-01 09:00:00+09')
event_feature.info_id = event_feature_info.id
event_feature.event_id = event.id

feature_summary = ms.FeatureSummary()
feature_summary.id = str(uuid.uuid4())
feature_summary.collect_date = parse('1900-05-01 09:00:00+09')
feature_summary.info_id = event_feature_info.id

event_feature_change = ms.EventFeatureChange()
event_feature_change.id = str(uuid.uuid4())
event_feature_change.collect_date = parse('1900-05-01 09:00:00+09')
event_feature_change.info_id = event_feature_info.id

event_condition_info = ms.EventConditionInfo()
event_condition_info.id = str(uuid.uuid4())
event_condition_info.event_info_id = info.id
event_condition_info.com_device_id = 1

range_task_c = ms.RangeTarget()
range_task_c.id = str(uuid.uuid4())
range_task_c.name = 'mock'
range_task_c.param_id = event_condition_info.id

event_condition = ms.EventCondition()
event_condition.id = str(uuid.uuid4())
event_condition.collect_date = parse('1900-05-01 09:00:00+09')
event_condition.info_id = event_condition_info.id
event_condition.event_id = event.id

condition_summury = ms.ConditionSummary()
condition_summury.id = str(uuid.uuid4())
condition_summury.value = 1
condition_summury.count = 1
condition_summury.interval = 'day'
condition_summury.collect_date = parse('1900-05-01 09:00:00+09')
condition_summury.info_id = event_condition_info.id


def setup():
    with DBSession() as sess:
        sess.merge(info)
        sess.merge(event)
        sess.merge(range_task)
        sess.merge(event_feature_info)
        sess.merge(range_task_f)
        sess.merge(event_feature)
        sess.merge(feature_summary)
        sess.merge(event_feature_change)
        sess.merge(event_condition_info)
        sess.merge(range_task_c)
        sess.merge(event_condition)
        sess.merge(condition_summury)
        sess.commit()


def test_delete_cascade():
    with DBSession() as sess:

        obj = qry.EventInfo(session=sess)\
            .delete_cascade(info.id)

        query_data = qry.EventInfo(session=sess)\
            .filter(ms.EventInfo.id == info.id)\
            .all()
        assert len(query_data) == 0

        query_data = qry.Event(session=sess)\
            .filter(ms.Event.info_id == info.id)\
            .all()
        assert len(query_data) == 0

        query_data = qry.RangeTarget(session=sess)\
            .filter(ms.RangeTarget.param_id == info.id)\
            .all()
        assert len(query_data) == 0

        query_data = qry.EventFeatureInfo(session=sess)\
            .filter(ms.EventFeatureInfo.event_info_id == info.id)\
            .all()
        assert len(query_data) == 0

        query_data = qry.RangeTarget(session=sess)\
            .filter(ms.RangeTarget.param_id == event_feature_info.id)\
            .all()
        assert len(query_data) == 0

        query_data = qry.EventFeature(session=sess)\
            .filter(ms.EventFeature.info_id == event_feature_info.id)\
            .all()
        assert len(query_data) == 0

        query_data = qry.FeatureSummary(session=sess)\
            .filter(ms.FeatureSummary.info_id == event_feature_info.id)\
            .all()
        assert len(query_data) == 0

        query_data = qry.EventFeatureChange(session=sess)\
            .filter(ms.EventFeatureChange.info_id == event_feature_info.id)\
            .all()
        assert len(query_data) == 0

        query_data = qry.EventConditionInfo(session=sess)\
            .filter(ms.EventConditionInfo.event_info_id == info.id)\
            .all()
        assert len(query_data) == 0

        query_data = qry.RangeTarget(session=sess)\
            .filter(ms.RangeTarget.param_id == event_condition_info.id)\
            .all()
        assert len(query_data) == 0

        query_data = qry.EventCondition(session=sess)\
            .filter(ms.EventCondition.info_id == event_condition_info.id)\
            .all()
        assert len(query_data) == 0

        query_data = qry.ConditionSummary(session=sess)\
            .filter(ms.ConditionSummary.info_id == event_condition_info.id)\
            .all()
        assert len(query_data) == 0


def test_recalc():
    with DBSession() as sess:

        obj = qry.EventInfo(session=sess)\
            .recalc(info)

        query_data = qry.EventInfo(session=sess)\
            .filter(ms.EventInfo.id == info.id)\
            .all()
        assert len(query_data) == 1

        query_data = qry.Event(session=sess)\
            .filter(ms.Event.info_id == info.id)\
            .all()
        assert len(query_data) == 0

        query_data = qry.RangeTarget(session=sess)\
            .filter(ms.RangeTarget.param_id == info.id)\
            .all()
        assert len(query_data) == 0

        query_data = qry.EventFeatureInfo(session=sess)\
            .filter(ms.EventFeatureInfo.event_info_id == info.id)\
            .all()
        assert len(query_data) == 1

        query_data = qry.RangeTarget(session=sess)\
            .filter(ms.RangeTarget.param_id == event_feature_info.id)\
            .all()
        assert len(query_data) == 0

        query_data = qry.EventFeature(session=sess)\
            .filter(ms.EventFeature.info_id == event_feature_info.id)\
            .all()
        assert len(query_data) == 0

        query_data = qry.FeatureSummary(session=sess)\
            .filter(ms.FeatureSummary.info_id == event_feature_info.id)\
            .all()
        assert len(query_data) == 0

        query_data = qry.EventFeatureChange(session=sess)\
            .filter(ms.EventFeatureChange.info_id == event_feature_info.id)\
            .all()
        assert len(query_data) == 0

        query_data = qry.EventConditionInfo(session=sess)\
            .filter(ms.EventConditionInfo.event_info_id == info.id)\
            .all()
        assert len(query_data) == 1

        query_data = qry.RangeTarget(session=sess)\
            .filter(ms.RangeTarget.param_id == event_condition_info.id)\
            .all()
        assert len(query_data) == 0

        query_data = qry.EventCondition(session=sess)\
            .filter(ms.EventCondition.info_id == event_condition_info.id)\
            .all()
        assert len(query_data) == 0

        query_data = qry.ConditionSummary(session=sess)\
            .filter(ms.ConditionSummary.info_id == event_condition_info.id)\
            .all()
        assert len(query_data) == 0


def teardown():
    with DBSession() as sess:
        qry.EventInfo(session=sess).delete()
        qry.RangeTarget(session=sess).delete()
        qry.Event(session=sess).delete()
        qry.EventFeatureInfo(session=sess).delete()
        qry.EventFeature(session=sess).delete()
        qry.FeatureSummary(session=sess).delete()
        qry.EventFeatureChange(session=sess).delete()
        qry.EventConditionInfo(session=sess).delete()
        qry.EventCondition(session=sess).delete()
        qry.ConditionSummary(session=sess).delete()
        sess.commit()
