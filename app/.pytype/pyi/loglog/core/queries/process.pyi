# (generated with --quick)

import mlboard.core.database
import mlboard.core.models.process
from typing import Any, Coroutine, Type

IConnection: Type[mlboard.core.database.IConnection]
TABLE_NAME: str
concat: Any
crud: module
filter: Any
first: Any
map: Any
ms: module
pipe: Any
reduce: Any
sorted: Any
take: Any
unique: Any
uuid: module

class Process:
    conn: mlboard.core.database.IConnection
    def __init__(self, conn: mlboard.core.database.IConnection) -> None: ...
    def insert(self, obj: mlboard.core.models.process.IProcess) -> coroutine: ...
    def upsert(self, obj: mlboard.core.models.process.IProcess) -> Coroutine[Any, Any, uuid.UUID]: ...
