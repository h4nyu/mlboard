#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import Flask, jsonify
from flask.json import JSONEncoder
from datetime import datetime
from .models import BaseModel


class DefaultEncoder(JSONEncoder):

    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        elif isinstance(obj, BaseModel):
            return obj.to_dict()
        elif isinstance(obj, BaseModel):
            return obj.to_dict()
        else:
            return JSONEncoder.default(self, obj)
