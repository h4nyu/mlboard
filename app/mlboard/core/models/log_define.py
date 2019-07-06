import uuid
from dataclasses import field, dataclass
from mlboard.config import TZ
from datetime import datetime
import typing as t

class LogDefine:
    id: uuid.UUID 
    create_date:datetime
    prefix: str 
    log_type: str
    def __init__(
        self,
        log_type:str,
        prefix:str,
        id: t.Optional[uuid.UUID]=None,
        create_date:datetime=datetime.now(TZ)
    ):
        self.id = id if id is not None else uuid.uuid4()
        self.prefix =prefix
        self.log_type= log_type
