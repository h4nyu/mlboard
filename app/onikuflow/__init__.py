#!/usr/bin/env python
# -*- coding: utf-8 -*-
import logging
from flask import Flask
from .utils.encorders import DefaultEncoder

app = Flask(__name__)
app.json_encoder = DefaultEncoder

from . import view

logging.basicConfig(
    format='%(asctime)s %(levelname)-8s %(message)s',
)
logger = logging.getLogger(__name__)
logger.setLevel(level=logging.DEBUG)
