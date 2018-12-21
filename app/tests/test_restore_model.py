#!/usr/bin/env python
# -*- coding: utf-8 -*-
from cytoolz.curried import pipe, filter, map, concat
import pytest
import keras
from keras.models import Model
import osca.ops as op
import json
import pprint


targets = []

target = op.OscaInput().output
masked = op.ClipRightTime(100)(target)
model = Model(inputs=target, outputs=masked)
targets.append(model)


target = op.OscaInput().output
masked = op.GreaterFirst(10)(target)
model = Model(inputs=target, outputs=masked)
targets.append(model)

target = op.OscaInput().output
point = op.OscaInput(batch_input_shape=(1, 2, 1, 1)).output
masked = op.MaskRight()([target, point])
model = Model(inputs=[target, point], outputs=masked)
targets.append(model)

target = op.OscaInput().output
outputs = op.Rise()(target)
model = Model(inputs=[target], outputs=outputs)
targets.append(model)

target = op.ComDevInput(device_id=4).output
outputs = op.Max()(target)
model = Model(inputs=[target], outputs=outputs)
targets.append(model)

model_jsons = pipe(
    targets,
    map(lambda x: x.to_json()),
    list
)


@pytest.mark.parametrize("model_json", model_jsons)
def test_deserialize(model_json):
    model_dict = json.loads(model_json)
    assert isinstance(model_dict, dict)
    model = keras.layers.deserialize(model_dict, op.custom_objects)
    model.summary()
