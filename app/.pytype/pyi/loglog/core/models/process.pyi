# (generated with --quick)

import typing
from typing import Any, Optional, Type

Protocol: Type[typing.Protocol]
TZ: Optional[datetime.tzinfo]
TypedDict: Any
datetime: Type[datetime.datetime]
t: module
uuid: module

class IProcess(typing.Protocol):
    chamber_id: uuid.UUID
    collect_date: Optional[datetime.datetime]
    create_date: datetime.datetime
    id: uuid.UUID
    log_define_id: uuid.UUID
    name: str
    state: int
    status: int
    unit: str
    value: Optional[float]

class Process(IProcess):
    chamber_id: uuid.UUID
    collect_date: Optional[datetime.datetime]
    create_date: datetime.datetime
    id: uuid.UUID
    log_define_id: uuid.UUID
    name: str
    state: int
    status: int
    value: Optional[float]
    def __init__(self, name: str, chamber_id: uuid.UUID, log_define_id: uuid.UUID, state: int, unit: str = ..., value: Optional[float] = ..., collect_date: Optional[datetime.datetime] = ..., status: int = ..., id: uuid.UUID = ...) -> None: ...
