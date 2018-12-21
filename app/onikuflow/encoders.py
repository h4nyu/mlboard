#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import Flask, jsonify
from flask.json import JSONEncoder
from datetime import datetime
from .models.model_base import SerializableMixIn


class DefaultEncoder(JSONEncoder):

    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        elif isinstance(obj, SerializableMixIn):
            return obj.to_dict()
        elif isinstance(obj, pd.DataFrame):
            return obj.to_dict('list')
        return JSONEncoder.default(self, obj)
