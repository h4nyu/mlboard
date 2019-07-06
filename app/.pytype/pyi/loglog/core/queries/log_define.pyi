# (generated with --quick)

import mlboard.core.database
import mlboard.core.models.log_define
from typing import Any, Coroutine, Type

IConnection: Type[mlboard.core.database.IConnection]
TABLE_NAME: str
ms: module
uuid: module

class LogDefine:
    conn: mlboard.core.database.IConnection
    def __init__(self, conn: mlboard.core.database.IConnection) -> None: ...
    def insert(self, obj: mlboard.core.models.log_define.LogDefine) -> Coroutine[Any, Any, uuid.UUID]: ...
    def upsert(self, obj: mlboard.core.models.log_define.LogDefine) -> Coroutine[Any, Any, uuid.UUID]: ...
