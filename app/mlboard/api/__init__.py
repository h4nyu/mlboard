from fastapi import FastAPI
from logging import getLogger, Formatter, StreamHandler, DEBUG
from .trace import router as trace_router
from .point import router as point_router
from .workspace import router as workspace_router

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
    app.include_router(trace_router)
    app.include_router(workspace_router)
    return app
