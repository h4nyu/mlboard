#  from flask import Flask
#  from ..config import config
#  from .encoders import StrictEncoder
#  from .services.experiment import bp as experiemnt_bp
#  from mlboard.orm import models as ms
#  from logging import getLogger, Formatter, StreamHandler, DEBUG
#
#  logger = getLogger("api")
#  formatter = Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
#  handler = StreamHandler()
#  handler.setLevel(DEBUG)
#  handler.setFormatter(formatter)
#  logger.setLevel(DEBUG)
#  logger.addHandler(handler)
#
#
#  def open_db():
#      ms.db.connect(reuse_if_open=True)
#
#
#  def close_db(exc):
#      if not ms.db.is_closed():
#          ms.db.close()
#
#
#  def create_app(test_config=None):
#      app = Flask(__name__, instance_relative_config=True)
#      app.before_request(open_db)
#      app.teardown_request(close_db)
#      app.config.update(**config)
#      app.json_encoder = StrictEncoder
#      app.register_blueprint(experiemnt_bp)
#      return app

from fastapi import FastAPI
from starlette.requests import Request
from .services import experiment
from mlboard.orm import db


async def db_session_middleware(request: Request, call_next):
    await db.connect()
    try:
        response = await call_next(request)
    finally:
        await db.disconnect()
    return response

def create_app():
    app = FastAPI()
    app.title = 'MLBoard'
    app.openapi_prefix="/api"
    app.include_router(experiment.router)
    app.middleware("http")(db_session_middleware)
    return app
