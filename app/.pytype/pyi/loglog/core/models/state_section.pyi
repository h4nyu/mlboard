# (generated with --quick)

import typing
from typing import Type

Protocol: Type[typing.Protocol]
datetime: Type[datetime.datetime]
t: module
uuid: module

class IStateSection(typing.Protocol):
    from_date: datetime.datetime
    id: uuid.UUID
    log_define_id: uuid.UUID
    state: int
    to_date: datetime.datetime

class StateSection(IStateSection):
    from_date: datetime.datetime
    id: uuid.UUID
    log_define_id: uuid.UUID
    state: int
    to_date: datetime.datetime
    def __init__(self, log_define_id: uuid.UUID, state: int, from_date: datetime.datetime, to_date: datetime.datetime, id: uuid.UUID = ...) -> None: ...
