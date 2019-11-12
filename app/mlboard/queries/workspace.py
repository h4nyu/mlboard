from uuid import UUID
from mlboard.models.protocols import IWorkspace
from mlboard.models.workspace import Workspace
from mlboard.infra.db.protocols import IConnection
from .model import ModelQuery


class WorkspaceQuery(ModelQuery[IWorkspace, UUID]):
    def __init__(self, conn: IConnection) -> None:
        super().__init__(
            conn=conn,
            table_name='workspaces',
            to_model=lambda row: Workspace(
                id=row['id'],
                name=row['name'],
                params=row['params'],
                created_at=row['created_at'],
            )
        )
