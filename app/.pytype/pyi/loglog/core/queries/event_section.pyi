# (generated with --quick)

import mlboard.core.database
import mlboard.core.models.event_section
from typing import Any, Coroutine, Dict, List, Sequence, Type

IRecord = Dict[str, Any]

IConnection: Type[mlboard.core.database.IConnection]
TABLE_NAME: str
crud: module
datetime: Type[datetime.datetime]
db: mlboard.core.database.Database
map: Any
ms: module
pipe: Any
t: module
uuid: module

class EventSection:
    conn: mlboard.core.database.IConnection
    def __init__(self, conn: mlboard.core.database.IConnection) -> None: ...
    def bulk_insert(self, rows: Sequence[mlboard.core.models.event_section.IEventSection]) -> Coroutine[Any, Any, int]: ...
    def delete(self) -> Coroutine[Any, Any, None]: ...
    def range_by(self, from_date, to_date, chamber_ids = ...) -> Coroutine[Any, Any, List[mlboard.core.models.event_section.IEventSection]]: ...
    def to_model(self, row: Dict[str, Any]) -> mlboard.core.models.event_section.IEventSection: ...
    def to_models(self, rows: List[Dict[str, Any]]) -> List[mlboard.core.models.event_section.IEventSection]: ...
