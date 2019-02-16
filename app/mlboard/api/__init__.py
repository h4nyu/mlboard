from flask import Flask
from ..config import config
from .encoders import DefaultEncoder
from .view import api_bp


def create_api(test_config=None):
    api = Flask(__name__, instance_relative_config=True)
    api.config.update(**config)
    api.json_encoder = DefaultEncoder
    api.register_blueprint(api_bp)
    return api
