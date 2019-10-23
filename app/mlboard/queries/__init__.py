from mlboard.config import DB_CONN
from mlboard.dao.postgresql import Connection


def get_conn() -> Connection:
    return Connection(DB_CONN)
