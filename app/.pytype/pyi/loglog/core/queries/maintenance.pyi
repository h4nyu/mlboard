# (generated with --quick)

import mlboard.core.database
import mlboard.core.models.maintenance
import mlboard.core.queries.maintenance_log
import mlboard.core.queries.trace_level
from typing import Any, Coroutine, Type, TypeVar

IConnection: Type[mlboard.core.database.IConnection]
MaintenanceLog: Type[mlboard.core.queries.maintenance_log.MaintenanceLog]
TABLE_NAME: str
TraceLevel: Type[mlboard.core.queries.trace_level.TraceLevel]
crud: module
ms: module
t: module
uuid: module

_T0 = TypeVar('_T0')

class Maintenance:
    conn: mlboard.core.database.IConnection
    def __init__(self, conn: mlboard.core.database.IConnection) -> None: ...
    def delete_by(self, id: _T0) -> Coroutine[Any, Any, _T0]: ...
    def filter_in(self, chamber_ids = ...) -> coroutine: ...
    def get_by(self, **kwargs) -> coroutine: ...
    def insert(self, obj: mlboard.core.models.maintenance.Maintenance) -> coroutine: ...
    def to_model(self) -> Any: ...
    def to_models(self) -> Any: ...
    def update(self, **kwargs) -> coroutine: ...
    def upsert(self, obj: mlboard.core.models.maintenance.Maintenance) -> Coroutine[Any, Any, uuid.UUID]: ...
