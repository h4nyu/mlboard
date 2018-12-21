#!/usr/bin/env python
# -*- coding: utf-8 -*-

import pytest
import osca.models as ms
import osca.query as qry
from osca.session import DBSession
from dateutil.parser import parse

import datetime
from dateutil import tz


@pytest.fixture()
def search_date_has_deficit():
    return parse('2018-11-29 00:00:00+09:00'), parse('2018-11-29 00:01:00+09:00')


@pytest.fixture()
def search_date_no_deficit():
    return parse('2018-11-29 00:00:00+09:00'), parse('2018-11-29 00:01:00+09:00')


@pytest.fixture()
def no_device_search_date():
    from_date = datetime.datetime(2017, 5, 1, 8, 16, 57)
    to_date = datetime.datetime(2017, 5, 1, 8, 26, 0)
    return from_date, to_date


@pytest.fixture(params=[4096, 4097])
def plc_device(request):
    dev = ms.PlcDevice()
    dev.num = request.param
    dev.type = 2
    unit = ms.Unit()
    unit.id = 1
    dev.unit = unit
    return dev


@pytest.fixture()
def process(request):
    process = ms.Process
    process.id = 1
    return process


@pytest.fixture(params=range(6))
def com_device(request):
    dev = ms.ComDevice()
    dev.col_num = request.param
    unit = ms.Unit()
    unit.id = 1
    dev.unit = unit
    return dev


def test_get_com_timerange(search_date_no_deficit, com_device):
    from_date, to_date = search_date_no_deficit

    with DBSession() as sess:
        rows = qry.LogMeasurementData(session=sess)\
            .search_range(from_date=from_date, to_date=to_date,
                          unit_id=com_device.unit.id,
                          col_num=com_device.col_num)
        assert rows[0]['collect_date'] >= from_date
        assert rows[-1]['collect_date'] <= to_date


@pytest.mark.parametrize('from_date, to_date, ans', [
    ('2018-11-29 00:00:00+09:00', '2018-11-29 00:00:01+09:00', 0),
    ('2018-11-29 00:01:00+09:00', '2018-11-29 00:02:00+09:00', 1),
])
def test_active_range(from_date, to_date, ans):
    from_date = parse(from_date)
    to_date = parse(to_date)
    with DBSession() as sess:
        ranges = qry.LogControlData(session=sess)\
            .active_ranges(unit_id=1,
                           from_date=from_date,
                           to_date=to_date)
        assert len(ranges) == ans
