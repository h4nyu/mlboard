#!/usr/bin/env python
# -*- coding: utf-8 -*-
import osca.ops.layers as op
from keras.models import Model
import pytest


@pytest.mark.parametrize('shape', [(1, 2, None, 1), (1, 2, 1, 1)])
def test_abs_shape(shape):
    in0 = op.OscaInput(batch_input_shape=shape).output
    outputs = op.Abs()(in0)
    model = Model(inputs=in0, outputs=outputs)
    assert model._output_layers[0].output_shape == shape


@pytest.mark.parametrize('shape', [(1, 2, None, 1), (1, 2, 1, 1)])
def test_max_shape(shape):
    in0 = op.OscaInput(batch_input_shape=shape).output
    outputs = op.Max()(in0)
    model = Model(inputs=in0, outputs=outputs)
    assert model._output_layers[0].output_shape == (1, 2, 1, 1)


@pytest.mark.parametrize('shape', [(1, 2, None, 1), (1, 2, 1, 1)])
def test_grad_shape(shape):
    try:
        in0 = op.OscaInput(batch_input_shape=shape).output
        outputs = op.Grad()(in0)
        model = Model(inputs=in0, outputs=outputs)
        assert model._output_layers[0].output_shape == (1, 2, None, 1)
    except AssertionError as e:
        assert shape == (1, 2, 1, 1)
