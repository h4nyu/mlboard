#!/usr/bin/env python
# -*- coding: utf-8 -*-
import osca.models as ms


def test_deserialize():
    source = ms.ProcessInfo()
    source.start_device_id = 1
    source.id = 1
    source_str = source.to_dict()
    obj = ms.ProcessInfo()
    obj.from_dict(source_str)
    restored = obj.to_dict()

    assert restored == source_str
