#!/usr/bin/env python
# -*- coding: utf-8 -*-
from .view import api_bp
from .utils.encorders import DefaultEncoder
from flask import Flask
import logging

logging.basicConfig(
    format='%(asctime)s %(levelname)-8s %(message)s',
)
logger = logging.getLogger(__name__)
logger.setLevel(level=logging.DEBUG)


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.json_encoder = DefaultEncoder
    app.register_blueprint(api_bp)
    return app
