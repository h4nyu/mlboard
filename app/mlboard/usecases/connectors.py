from mlboard.dao.postgresql import Connection
from mlboard.config import DB_CONN
from ..queries.point import PointQuery
from ..queries.trace import TraceQuery
from ..queries.workspace import WorkspaceQuery
from .point import PointUsecase
from .trace import TraceUsecase
from .workspace import WorkspaceUsecase
from .protocols import IPointUsecase, ITraceUsecase, IWorkspaceUsecase


def get_conn() -> Connection: return Connection(DB_CONN)


def get_point_usecase() -> IPointUsecase:
    return PointUsecase(
        get_conn=get_conn,
        point_query=PointQuery,
    )


def get_trace_usecase() -> ITraceUsecase:
    return TraceUsecase(
        get_conn=get_conn,
        trace_query=TraceQuery,
        point_query=PointQuery,
    )


def get_workspace_usecase() -> IWorkspaceUsecase:
    return WorkspaceUsecase(
        get_conn=get_conn,
        workspace_query=WorkspaceQuery,
        trace_query=TraceQuery,
        point_query=PointQuery,
    )
