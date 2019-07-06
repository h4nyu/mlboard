# (generated with --quick)

import typing
from typing import Any, Callable, Mapping, Optional, Type, TypeVar

Protocol: Type[typing.Protocol]
TZ: Optional[datetime.tzinfo]
datetime: Type[datetime.datetime]
uuid: module

_T = TypeVar('_T')

class Sensor(typing.Protocol):
    category_name: str
    chamber_id: uuid.UUID
    col_name: str
    collect_date: datetime.datetime
    create_date: datetime.datetime
    id: uuid.UUID
    log_define_id: uuid.UUID
    name: str
    status: int
    unit: str
    value: float

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
