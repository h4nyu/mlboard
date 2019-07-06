# (generated with --quick)

import mlboard.core.database
import mlboard.core.models.sensor
from typing import Any, Coroutine, List, Type

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
t: module
take: Any
unique: Any
uuid: module

class Sensor:
    conn: mlboard.core.database.IConnection
    def __init__(self, conn: mlboard.core.database.IConnection) -> None: ...
    def delete(self) -> Coroutine[Any, Any, None]: ...
    def filter_by(self, **kwargs) -> Coroutine[Any, Any, List[mlboard.core.models.sensor.Sensor]]: ...
    def insert(self, obj: mlboard.core.models.sensor.Sensor) -> Coroutine[Any, Any, uuid.UUID]: ...
    def upsert(self, obj: mlboard.core.models.sensor.Sensor) -> Coroutine[Any, Any, uuid.UUID]: ...
