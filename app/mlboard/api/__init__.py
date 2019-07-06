#  from flask import Flask
#  from ..config import config
from fastapi import FastAPI
from .services import process
from .services import chamber
from .services import sensor
from .services import trace_level
from .services import event_section
from .services import trace
from .services import maintenance_log
from .services import maintenance
from .services import trace_event
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
        except:
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
    app.include_router(process.router, tags=['process'])
    app.include_router(chamber.router, tags=['chamber'])
    app.include_router(sensor.router, tags=['sensor'])
    app.include_router(trace_level.router, tags=['trace_level'])
    app.include_router(event_section.router, tags=['event_section'])
    app.include_router(trace.router, tags=['trace'])
    app.include_router(maintenance_log.router, tags=['maintenance_log'])
    app.include_router(maintenance.router, tags=['maintenance'])
    app.include_router(trace_event.router, tags=['trace_event'])
    return app
