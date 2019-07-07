#  from flask import Flask
#  from ..config import config
from fastapi import FastAPI
from .services import trace
from mlboard.core import db
import asyncio
from logging import getLogger, Formatter, StreamHandler, DEBUG
from starlette.requests import Request

logger = getLogger("api")
formatter = Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler = StreamHandler()
handler.setLevel(DEBUG)
handler.setFormatter(formatter)
logger.setLevel(DEBUG)
logger.addHandler(handler)
logger.propagate = False


async def startup() -> None:
    while not db.is_connected:
        try:
            logger.info('try connect to database')
            await db.connect()
        except Exception:
            logger.info('connection fail')
            logger.info('try reconecting in 5s')
            await asyncio.sleep(5)
    logger.info('connection success!')


async def shutdown() -> None:
    await db.disconnect()
    logger.info('close database connections')


def create_app() -> FastAPI:
    app = FastAPI()
    app.title = 'mlboard'
    app.openapi_prefix = "/api"
    app.docs_url = None
    app.redoc_url = None
    app.on_event("startup")(startup)
    app.on_event("shutdown")(shutdown)
    app.include_router(trace.router, tags=['trace'])
    return app
