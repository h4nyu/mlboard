#!/usr/bin/env python
# -*- coding: utf-8 -*-
from cytoolz.curried import pipe, map, take
from osca import models as ms
import osca.query as qry
from osca.session import DBSession
from functional import seq
import uuid
from dateutil.parser import parse
from datetime import timedelta

table_name = 'event_condition_00073ecddd834827ba1a8275326c59b8_1900_03'
schema = 'osca_collect'
info_id = '00073ecd-dd83-4827-ba1a-8275326c59b8'


def new_event_condition():
    event_condition = ms.EventCondition()
    event_condition.id = uuid.uuid4()
    event_condition.value = 1
    event_condition.event_id = uuid.uuid4()
    event_condition.collect_date = parse('1900-03-01 11:00:00+09')
    event_condition.product_id = 1
    event_condition.info_id = info_id
    return event_condition


def setup():
    event_conditions = pipe(range(100), map(
        lambda x: new_event_condition()), list)
    with DBSession() as sess:
        qry.EventCondition(session=sess).bulk_insert(event_conditions)
        sess.commit()


def teardown():
    with DBSession() as sess:
        sess.execute("""
                     DROP TABLE IF EXISTS osca_collect.{};
                     """.format(table_name))
        sess.commit()


def test_create_table():
    with DBSession() as sess:
        query_data = sess.execute("""
                     SELECT table_name FROM information_schema.tables
                     WHERE table_name = '{}' AND table_schema = 'osca_collect';
                     """.format(table_name))
        assert seq(query_data).map(lambda x: x[0]).to_list()[0] == table_name


def test_insert():
    with DBSession() as sess:
        p = qry.EventCondition(session=sess)\
            .filter(ms.EventCondition.info_id == info_id)\
            .all()
        assert len(p) == 100
        sql = f"""
             select 0 from {schema}.{table_name}
             where info_id = '{info_id}';
        """
        query_data = sess.execute(sql)
        len(list(query_data)) == 100
