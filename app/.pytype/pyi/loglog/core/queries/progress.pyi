# (generated with --quick)

import mlboard.core.database
import mlboard.core.models.progress
from typing import Any, Coroutine, Dict, Optional, Type

IConnection: Type[mlboard.core.database.IConnection]
TABLE_NAME: str
crud: module
ms: module
t: module
uuid: module

class Progress:
    conn: mlboard.core.database.IConnection
    def __init__(self, conn: mlboard.core.database.IConnection) -> None: ...
    def get_by(self, **kwargs) -> Coroutine[Any, Any, Optional[Dict[str, Any]]]: ...
    def insert(self, obj: mlboard.core.models.progress.Progress) -> coroutine: ...
    def update(self, **kwargs) -> coroutine: ...
    def upsert(self, obj: mlboard.core.models.progress.Progress) -> Coroutine[Any, Any, uuid.UUID]: ...
