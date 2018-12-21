#!/usr/bin/env python
# -*- coding: utf-8 -*-
import pytest
import osca.models as ms
from dateutil.parser import parse
import osca.query as qry
from osca.session import DBSession


@pytest.fixture()
def plc_device():
    dev = ms.PlcDevice()
    dev.num = 4096
    dev.type = 2
    dev.unit_id = 1
    return dev


@pytest.fixture()
def com_device():
    dev = ms.ComDevice()
    dev.col_num = 2
    dev.unit_id = 1
    return dev


@pytest.mark.parametrize("from_date, to_date", [
    (parse('2018-11-29 11:00:00+09:00'), parse('2018-11-29 11:01:00+09:00'))
])
def test_get_plc_log(from_date, to_date, plc_device):
    with DBSession() as sess:
        rows = qry.LogControlData(session=sess)\
            .search_range(from_date,
                          to_date,
                          dev_type=plc_device.type,
                          dev_num=plc_device.num,
                          unit_id=plc_device.unit_id)
        assert len(rows) == 10722


@pytest.mark.parametrize("from_date, to_date", [
    (parse('2018-11-29 11:00:00+09:00'), parse('2018-11-29 11:01:00+09:00'))
])
def test_get_com_log(from_date, to_date, com_device):
    with DBSession() as sess:
        rows = qry.LogMeasurementData(session=sess)\
            .search_range(from_date,
                          to_date,
                          col_num=com_device.col_num,
                          unit_id=com_device.unit_id)
        assert len(rows) == 10722
