from flask import Flask
from ..config import config
from .encoders import DefaultEncoder
from .services.experiment import experiment_bp
from .services.healthcheck import healthcheck_bp
from logging import getLogger, Formatter, StreamHandler, DEBUG

logger = getLogger("api")
formatter = Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler = StreamHandler()
handler.setLevel(DEBUG)
handler.setFormatter(formatter)
logger.setLevel(DEBUG)
logger.addHandler(handler)


def create_api(test_config=None):
    api = Flask(__name__, instance_relative_config=True)
    api.config.update(**config)
    api.json_encoder = DefaultEncoder
    api.register_blueprint(experiment_bp)
    api.register_blueprint(healthcheck_bp)
    return api
