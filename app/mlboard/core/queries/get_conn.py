from mlboard.dao.postgresql import Connection
from mlboard.config import DB_CONN


def get_conn(conn_str: str = DB_CONN) -> Connection:
    return Connection(DB_CONN)
