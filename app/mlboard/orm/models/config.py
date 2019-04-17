from .base_model import BaseModel
from peewee import TextField
from playhouse.postgres_ext import UUIDField, DateTimeTZField
from datetime import datetime
from mlboard.config import TZ
import uuid


class Config(BaseModel):
    class Meta:
        table_name = "configs"
    id = UUIDField(primary_key=True, default=uuid.uuid4)
    hash = UUIDField(default=uuid.uuid4)
    create_date = DateTimeTZField(default=lambda: datetime.now(TZ))
