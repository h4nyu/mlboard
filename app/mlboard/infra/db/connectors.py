from mlboard.config import DB_CONN
from .postgresql import ContextManager as _ContextManager
from .protocols import IContextManager


def ContextManager() -> IContextManager: return _ContextManager(DB_CONN)
