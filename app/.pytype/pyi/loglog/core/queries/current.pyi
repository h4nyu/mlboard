# (generated with --quick)

import mlboard.core.database
import mlboard.core.queries.maintenance
import mlboard.core.queries.process
import mlboard.core.queries.sensor
from typing import Any, Coroutine, List, Type

IConnection: Type[mlboard.core.database.IConnection]
Maintenance: Type[mlboard.core.queries.maintenance.Maintenance]
Process: Type[mlboard.core.queries.process.Process]
Sensor: Type[mlboard.core.queries.sensor.Sensor]
curry: Any
ms: module
typing: module
uuid: module

class Current:
    conn: mlboard.core.database.IConnection
    to_model: Any
    to_models: Any
    def __init__(self, conn: mlboard.core.database.IConnection) -> None: ...
    def all(self) -> coroutine: ...
    def filter_in(self, ids: List[uuid.UUID]) -> coroutine: ...
    def update_status(self, id, status) -> Coroutine[Any, Any, None]: ...
    def update_value(self, id, value, collect_date) -> Coroutine[Any, Any, None]: ...
