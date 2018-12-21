#!/usr/bin/env python
# -*- coding: utf-8 -*-
import osca.models as ms
import datetime


def test_serialize():
    obj = ms.ProcessInfo()
    assert len(obj.to_dict()) == 11


def test_renamed_column():
    obj = ms.Unit()
    obj.name = "hoge"
    assert obj.to_dict()["name"] == "hoge"


def test_serialize_datetime():
    obj = ms.Process()
    obj.start_date = datetime.datetime.now()
    assert isinstance(obj.to_dict()['start_date'], str)
    assert obj.to_dict()['start_date'] == obj.start_date.isoformat()
