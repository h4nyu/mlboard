#!/usr/bin/env python
# -*- coding: utf-8 -*-
import pytest
import numpy as np
from osca.ops import SplitModel
from osca.ops import DiffModel


@pytest.fixture(scope='function', params=[[[30, 50], [70, 90]]])
def split_waveforms(request):
    def step(x, t):
        return 1 if x >= t else 0
    samples = 100
    start_offsets, end_offsets = request.param
    start_offset0, start_offset1 = start_offsets
    end_offset0, end_offset1 = end_offsets

    timestamp = np.arange(0, samples)

    start_sig = np.array([-step(x, start_offset0) for x in timestamp])
    start_sig = start_sig + \
        np.array([step(x, start_offset1) for x in timestamp])
    start_sig = np.stack((timestamp, start_sig))
    start_sig = start_sig.reshape(1, 2, samples, 1)
    end_sig = np.array([-step(x, end_offset0) for x in timestamp])
    end_sig = end_sig + np.array([step(x, end_offset1) for x in timestamp])
    end_sig = np.stack((timestamp, end_sig))
    end_sig = end_sig.reshape(1, 2, samples, 1)
    return start_sig, end_sig, start_offsets, end_offsets


def test_getrisepointsmodel(split_waveforms):
    model = DiffModel()
    s_sig, e_sig, start_offsets, end_offsets = split_waveforms

    model.predict([s_sig])
