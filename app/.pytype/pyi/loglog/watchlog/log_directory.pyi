# (generated with --quick)

import logging
import pathlib
from typing import Any, Optional, Type

Path: Type[pathlib.Path]
glob: module
logger: logging.Logger
map: Any
os: module
pipe: Any
shutil: module

class LogDirectory(object):
    base_path: str
    def __init__(self, base_path: str) -> None: ...
    def clear(self) -> None: ...
    def create(self) -> None: ...

def getLogger(name: Optional[str] = ...) -> logging.Logger: ...
