# (generated with --quick)

import mlboard.core.database
import mlboard.core.models.chamber
import mlboard.core.models.trace_level
from typing import Any, Coroutine, Dict, Optional, Sequence, Type

IRecord = Dict[str, Any]

IConnection: Type[mlboard.core.database.IConnection]
TABLE_NAME: str
asyncio: module
concat: Any
crud: module
filter: Any
first: Any
map: Any
ms: module
pipe: Any
sorted: Any
t: module
take: Any
unique: Any
uuid: module

class TraceLevel:
    conn: mlboard.core.database.IConnection
    def __init__(self, conn: mlboard.core.database.IConnection) -> None: ...
    def all(self) -> Coroutine[Any, Any, Sequence[mlboard.core.models.trace_level.ITraceLevel]]: ...
    def delete(self) -> coroutine: ...
    def delete_by(self, **kwargs) -> Coroutine[Any, Any, None]: ...
    def get_by(self, **kwargs) -> Coroutine[Any, Any, Optional[mlboard.core.models.trace_level.ITraceLevel]]: ...
    def insert(self, obj: mlboard.core.models.chamber.Chamber) -> coroutine: ...
    def to_model(self, row: Dict[str, Any]) -> mlboard.core.models.trace_level.ITraceLevel: ...
    def to_models(self, rows: Sequence[Dict[str, Any]]) -> Sequence[mlboard.core.models.trace_level.ITraceLevel]: ...
    def update(self, **kwargs) -> coroutine: ...
    def upsert(self, obj) -> Coroutine[Any, Any, uuid.UUID]: ...
