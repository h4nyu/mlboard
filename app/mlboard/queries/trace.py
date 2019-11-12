from uuid import UUID
from mlboard.models.protocols import ITrace
from mlboard.models.trace import Trace
from mlboard.infra.db.protocols import IConnection
from .model import ModelQuery


class TraceQuery(ModelQuery[ITrace, UUID]):
    def __init__(self, conn: IConnection) -> None:
        super().__init__(
            conn=conn,
            table_name='traces',
            to_model=lambda row: Trace(
                id=row['id'],
                name=row['name'],
                workspace_id=row['workspace_id'],
                created_at=row['created_at'],
                updated_at=row['updated_at'],
            )
        )
