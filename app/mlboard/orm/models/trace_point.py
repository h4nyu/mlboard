from .base_model import BaseModel
from peewee import FloatField, TextField, IntegerField
from playhouse.postgres_ext import UUIDField, DateTimeTZField, JSONField
from .. import enums as es
import uuid
from mlboard.config import TZ
from datetime import datetime

class TracePoint(BaseModel):
    class Meta:
        table_name = "trace_points"
    id = UUIDField(primary_key=True, default=uuid.uuid4)
    x = FloatField()
    y = FloatField()
    collect_date = DateTimeTZField(default=lambda: datetime.now(TZ))
    trace_id = UUIDField()
