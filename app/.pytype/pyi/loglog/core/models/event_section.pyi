# (generated with --quick)

import typing
from typing import Any, Callable, Mapping, Optional, Type, TypeVar

Protocol: Type[typing.Protocol]
TZ: Optional[datetime.tzinfo]
datetime: Type[datetime.datetime]
uuid: module

_T = TypeVar('_T')

class EventSection(IEventSection):
    chamber_id: uuid.UUID
    code: int
    from_date: datetime.datetime
    id: uuid.UUID
    message: str
    status: int
    substract_id: str
    to_date: datetime.datetime
    def __init__(self, from_date: datetime.datetime, to_date: datetime.datetime, code: int, status: int, chamber_id: uuid.UUID, substract_id: str = ..., message: str = ..., id: uuid.UUID = ...) -> None: ...

class IEventSection(typing.Protocol):
    chamber_id: uuid.UUID
    code: int
    from_date: datetime.datetime
    id: uuid.UUID
    message: str
    status: int
    substract_id: str
    to_date: datetime.datetime

@overload
def dataclass(_cls: Type[_T]) -> Type[_T]: ...
@overload
def dataclass(*, init: bool = ..., repr: bool = ..., eq: bool = ..., order: bool = ..., unsafe_hash: bool = ..., frozen: bool = ...) -> Callable[[Type[_T]], Type[_T]]: ...
@overload
def field(*, default: _T, init: bool = ..., repr: bool = ..., hash: bool = ..., compare: bool = ..., metadata: Optional[Mapping[str, Any]] = ...) -> _T: ...
@overload
def field(*, default_factory: Callable[[], _T], init: bool = ..., repr: bool = ..., hash: bool = ..., compare: bool = ..., metadata: Optional[Mapping[str, Any]] = ...) -> _T: ...
@overload
def field(*, init: bool = ..., repr: bool = ..., hash: bool = ..., compare: bool = ..., metadata: Optional[Mapping[str, Any]] = ...) -> Any: ...
