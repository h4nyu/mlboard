# (generated with --quick)

import typing
from typing import Any, Callable, Mapping, Optional, Type, TypeVar

Protocol: Type[typing.Protocol]
TZ: Optional[datetime.tzinfo]
datetime: Type[datetime.datetime]
uuid: module

_T = TypeVar('_T')

class IMaintenanceLog(typing.Protocol):
    create_date: datetime.datetime
    id: uuid.UUID
    maintenance_id: uuid.UUID
    occurred_date: datetime.datetime

class MaintenanceLog(IMaintenanceLog):
    create_date: datetime.datetime
    id: uuid.UUID
    maintenance_id: uuid.UUID
    occurred_date: datetime.datetime
    def __init__(self, maintenance_id: uuid.UUID, occurred_date: datetime.datetime, id: uuid.UUID = ..., create_date: datetime.datetime = ...) -> None: ...

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
