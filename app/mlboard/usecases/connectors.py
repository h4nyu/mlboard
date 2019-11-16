from ..queries.point import PointQuery
from ..queries.trace import TraceQuery
from ..queries.workspace import WorkspaceQuery
from ..queries.protocols import IConnection
from ..queries.transaction import Transaction
from .point import PointUsecase as _PointUsecase
from .trace import TraceUsecase as _TraceUsecase
from .workspace import WorkspaceUsecase as _WorkspaceUsecase
from .protocols import IPointUsecase, IWorkspaceUsecase, ITraceUsecase


def PointUsecase(x: IConnection) -> IPointUsecase: return _PointUsecase(
    transaction=Transaction(x),
    point_query=PointQuery(x),
    trace_query=TraceQuery(x),
)


def TraceUsecase(x: IConnection) -> ITraceUsecase: return _TraceUsecase(
    transaction=Transaction(x),
    trace_query=TraceQuery(x),
    point_query=PointQuery(x),
)


def WorkspaceUsecase(x: IConnection) -> IWorkspaceUsecase: return _WorkspaceUsecase(
    transaction=Transaction(x),
    trace_query=TraceQuery(x),
    point_query=PointQuery(x),
    workspace_query=WorkspaceQuery(x)
)
