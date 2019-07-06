# (generated with --quick)

import enum
from typing import Type

Enum: Type[enum.Enum]

class LogTypes(str, enum.Enum):
    TOKKI_EVENT_LOG: str
    TOKKI_PROCESS_LOG: str
    TOKKI_SENSOR_LOG: str

class StatusLevel(int, enum.Enum):
    CRITICAL: int
    ERROR: int
    HARD_WARNING: int
    INFO: int
    NOTSET: int
    WARNING: int

class TaskTypes(str, enum.Enum):
    ETL_TOKKI_EVENT_SECTION_LOG: str
    ETL_TOKKI_SENSOR_LOG: str
    ETL_TOKKI_STATE_SECTION_LOG: str
    ETL_TOKKI_STATE_SECTION_SPAN: str
