# (generated with --quick)

import mlboard.core.database
from typing import Any, Type

datetime: Type[datetime.datetime]
db: mlboard.core.database.Database
map: Any
ms: module
pipe: Any
uuid: module

class TraceEvent:
    def range_by(self, from_date, to_date, chamber_ids = ...) -> coroutine: ...
