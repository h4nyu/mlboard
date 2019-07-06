# (generated with --quick)

from typing import Any, Callable, Mapping, Optional, Type, TypeVar

TZ: Optional[datetime.tzinfo]
datetime: Type[datetime.datetime]
uuid: module

_T = TypeVar('_T')

class LogDefine:
    create_date: datetime.datetime
    id: uuid.UUID
    log_type: str
    prefix: str

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
