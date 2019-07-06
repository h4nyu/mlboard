# (generated with --quick)

import typing
from typing import Callable, Type, TypeVar

Protocol: Type[typing.Protocol]
datetime: Type[datetime.datetime]
typing: module
uuid: module

_T = TypeVar('_T')

class ITrace(typing.Protocol):
    config_id: uuid.UUID
    ts: datetime.datetime
    value: float

class Trace(ITrace):
    config_id: uuid.UUID
    ts: datetime.datetime
    value: float
    def __init__(self, value: float, config_id: uuid.UUID, ts: datetime.datetime) -> None: ...

@overload
def dataclass(_cls: Type[_T]) -> Type[_T]: ...
@overload
def dataclass(*, init: bool = ..., repr: bool = ..., eq: bool = ..., order: bool = ..., unsafe_hash: bool = ..., frozen: bool = ...) -> Callable[[Type[_T]], Type[_T]]: ...
