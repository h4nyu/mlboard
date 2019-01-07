#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import Blueprint
from flask_restful import Api
from .webapi import QueryAPI


api_bp = Blueprint('api', __name__)
api = Api(api_bp)
api.add_resource(QueryAPI, '/query')


