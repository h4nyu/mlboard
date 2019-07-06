# (generated with --quick)

import logging
import mlboard.core.database
import mlboard.core.models.trace
from typing import Any, Coroutine, Dict, Optional, Sequence, Type

IRecord = Dict[str, Any]

IConnection: Type[mlboard.core.database.IConnection]
TABLE_NAME: str
crud: module
db: mlboard.core.database.Database
logger: logging.Logger
map: Any
ms: module
pipe: Any
profile: Any
t: module
time: module
uuid: module

class Trace:
    conn: mlboard.core.database.IConnection
    def __init__(self, conn: mlboard.core.database.IConnection) -> None: ...
    def bulk_insert(self, objects) -> Coroutine[Any, Any, int]: ...
    def delete(self) -> Coroutine[Any, Any, None]: ...
    def diff_range_by(self, from_date, to_date) -> Coroutine[Any, Any, Sequence[mlboard.core.models.trace.ITrace]]: ...
    def last_by_config_id(self) -> Coroutine[Any, Any, Sequence[mlboard.core.models.trace.ITrace]]: ...
    def range_by(self, config_id, from_date, to_date, limit = ...) -> Coroutine[Any, Any, Sequence[mlboard.core.models.trace.ITrace]]: ...
    def to_model(self, row: Dict[str, Any]) -> mlboard.core.models.trace.ITrace: ...
    def to_models(self, rows: Sequence[Dict[str, Any]]) -> Sequence[mlboard.core.models.trace.ITrace]: ...

def getLogger(name: Optional[str] = ...) -> logging.Logger: ...
