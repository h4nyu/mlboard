# (generated with --quick)

import dataclasses
import logging
import mlboard.core.database
from typing import Any, Callable, Dict, List, Optional, Tuple, TypeVar

db: mlboard.core.database.Database
first: Any
itemfilter: Any
logger: logging.Logger
map: Any
ms: module
pipe: Any
reduce: Any
time: module
typing: module
uuid: module

_T = TypeVar('_T')

@overload
def asdict(obj) -> Dict[str, Any]: ...
@overload
def asdict(obj, *, dict_factory: Callable[[List[Tuple[str, Any]]], _T]) -> _T: ...
@overload
def astuple(obj) -> tuple: ...
@overload
def astuple(obj, *, tuple_factory: Callable[[list], _T]) -> _T: ...
def fields(class_or_instance) -> Tuple[dataclasses.Field, ...]: ...
def getLogger(name: Optional[str] = ...) -> logging.Logger: ...
