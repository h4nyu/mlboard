from mlboard.config import DB_CONN
from logging import getLogger
from .database import Database
import typing
logger = getLogger("api")

db = Database(DB_CONN)
