#!/usr/bin/env python
# -*- coding: utf-8 -*-
from . import app
from flask_restful import Api
from .webapi import QueryAPI


api = Api(app)
api.add_resource(QueryAPI, '/query')
