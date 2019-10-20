#  from flask import Flask
#  from ..config import config
from fastapi import FastAPI
import asyncio
from logging import getLogger, Formatter, StreamHandler, DEBUG
from starlette.requests import Request
from .trace import router as point_router

logger = getLogger("api")
formatter = Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler = StreamHandler()
handler.setLevel(DEBUG)
handler.setFormatter(formatter)
logger.setLevel(DEBUG)
logger.addHandler(handler)
logger.propagate = False



def create_app() -> FastAPI:
    app = FastAPI()
    app.title = 'mlboard'
    app.openapi_prefix = "/api"
    app.docs_url = None
    app.redoc_url = None
    app.include_router(point_router)
    return app
