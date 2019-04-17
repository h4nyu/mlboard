#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import Flask, jsonify
from flask.json import JSONEncoder
from datetime import datetime
from mlboard.orm.models.base_model import BaseModel


class StrictEncoder(JSONEncoder):
    def __init__(self, *args, **kwargs):
        kwargs["ignore_nan"] = True
        super().__init__(*args, **kwargs)

    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        elif isinstance(obj, BaseModel):
            return obj.to_dict()
        else:
            return JSONEncoder.default(self, obj)
