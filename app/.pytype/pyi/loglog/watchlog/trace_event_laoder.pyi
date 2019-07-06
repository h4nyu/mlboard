# (generated with --quick)

import datetime
import dateutil.parser
import dateutil.relativedelta
import pathlib
from typing import Any, IO, Optional, Type, Union

Path: Type[pathlib.Path]
concat: Any
filter: Any
first: Any
glob: module
json: module
map: Any
np: module
os: module
pd: module
pipe: Any
re: module
relativedelta: Type[dateutil.relativedelta.relativedelta]
sorted: Any
take: Any

def parse(timestr: Union[bytes, str, IO], parserinfo: Optional[dateutil.parser.parserinfo] = ..., **kwargs) -> datetime.datetime: ...
