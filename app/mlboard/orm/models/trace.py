from .config import Config
from playhouse.postgres_ext import UUIDField
from peewee import FloatField, TextField


class Trace(Config):
    class Meta:
        table_name = "traces"
    name = TextField()
    experiment_id = UUIDField()

