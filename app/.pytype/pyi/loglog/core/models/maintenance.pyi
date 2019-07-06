# (generated with --quick)

import typing
from typing import Any, Callable, Mapping, Optional, Type, TypeVar

Protocol: Type[typing.Protocol]
TZ: Optional[datetime.tzinfo]
datetime: Type[datetime.datetime]
t: module
uuid: module

_T = TypeVar('_T')

class IMaintenance(typing.Protocol):
    chamber_id: uuid.UUID
    collect_date: Optional[datetime.datetime]
    create_date: datetime.datetime
    id: uuid.UUID
    name: str
    status: int
    value: Optional[float]

class Maintenance(IMaintenance):
    chamber_id: uuid.UUID
    collect_date: Optional[datetime.datetime]
    create_date: datetime.datetime
    id: uuid.UUID
    name: str
    status: int
    value: Optional[float]
    def __init__(self, name: str, chamber_id: uuid.UUID, id: uuid.UUID = ..., create_date: datetime.datetime = ..., value: Optional[float] = ..., collect_date: Optional[datetime.datetime] = ..., status: int = ...) -> None: ...

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
