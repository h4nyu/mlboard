from mlboard.config import DB_CONN
from .postgresql import ContextManager as _ContextManager


def ContextManager(): return _ContextManager(DB_CONN)
