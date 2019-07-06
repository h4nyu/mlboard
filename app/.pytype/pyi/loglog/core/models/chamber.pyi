# (generated with --quick)

import typing
from typing import Any, Callable, Mapping, Optional, Type, TypeVar

Protocol: Type[typing.Protocol]
TZ: Optional[datetime.tzinfo]
datetime: Type[datetime.datetime]
t: module
typing: module
uuid: module

_T = TypeVar('_T')

class Chamber(IChamber):
    block_name: str
    collect_date: Optional[datetime.datetime]
    create_date: datetime.datetime
    error_count: int
    id: uuid.UUID
    name: str
    status: int
    value: Optional[float]
    warning_count: int
    def __init__(self, name: str, status: int = ..., warning_count: int = ..., error_count: int = ..., collect_date: Optional[datetime.datetime] = ..., value: Optional[float] = ..., block_name: str = ..., id: uuid.UUID = ..., create_date: datetime.datetime = ...) -> None: ...

class IChamber(typing.Protocol):
    block_name: str
    collect_date: Optional[datetime.datetime]
    create_date: datetime.datetime
    error_count: int
    id: uuid.UUID
    name: str
    status: int
    value: Optional[float]
    warning_count: int

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
