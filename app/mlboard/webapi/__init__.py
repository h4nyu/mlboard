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
    app.middleware("http")(db_session_middleware)
    app.include_router(experiment.router)
    app.include_router(trace.router)
    return app
