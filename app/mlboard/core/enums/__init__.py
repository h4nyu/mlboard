from enum import Enum


class StatusLevel(int, Enum):
    CRITICAL = 50
    ERROR = 40
    HARD_WARNING = 35
    WARNING = 30
    INFO = 20
    NOTSET = 0

