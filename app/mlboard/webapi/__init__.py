from fastapi import FastAPI
from starlette.requests import Request
from mlboard.orm import db
from logging import getLogger, Formatter, StreamHandler, DEBUG

from .services import experiment
from .services import trace

logger = getLogger("api")
formatter = Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler = StreamHandler()
handler.setLevel(DEBUG)
handler.setFormatter(formatter)
logger.setLevel(DEBUG)
logger.addHandler(handler)

async def startup():
    await db.connect()

async def shutdown():
    await db.disconnect()

def create_app():
    app = FastAPI()
    app.title = 'MLBoard'
    app.openapi_prefix="/api"
    app.on_event("startup")(startup)
    app.on_event("shutdown")(shutdown)
    app.include_router(experiment.router)
    app.include_router(trace.router)
    return app
