import typing as t
from mlboard.dao.postgresql import Connection
from mlboard.config import DB_CONN
from ..queries.point import PointQuery
from .point import PointUsecase
from .protocols import IPointUsecase

get_conn=lambda: Connection(DB_CONN)

get_point_usecase: t.Callable[[], IPointUsecase] = lambda : PointUsecase(
    get_conn=get_conn,
    point_query=PointQuery,
)
