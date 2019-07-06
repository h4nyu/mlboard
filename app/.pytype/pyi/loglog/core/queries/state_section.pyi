# (generated with --quick)

import mlboard.core.database
import mlboard.core.models.state_section
from typing import Any, Coroutine, List, Sequence, Type

IConnection: Type[mlboard.core.database.IConnection]
TABLE_NAME: str
crud: module
datetime: Type[datetime.datetime]
db: mlboard.core.database.Database
first: Any
map: Any
ms: module
pipe: Any
t: module
uuid: module

class StateSection:
    conn: mlboard.core.database.IConnection
    def __init__(self, conn: mlboard.core.database.IConnection) -> None: ...
    def bulk_insert(self, rows: Sequence[mlboard.core.models.state_section.IStateSection]) -> Coroutine[Any, Any, int]: ...
    def get_first(self, log_define_id: uuid.UUID) -> Coroutine[Any, Any, datetime.datetime]: ...
    def range_by(self, log_define_id: uuid.UUID, from_date: datetime.datetime, to_date: datetime.datetime) -> Coroutine[Any, Any, List[mlboard.core.models.state_section.IStateSection]]: ...
