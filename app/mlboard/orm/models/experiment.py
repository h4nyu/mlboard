from .config import Config
from peewee import TextField
from playhouse.postgres_ext import JSONField


class Experiment(Config):
    class Meta:
        table_name = "experiments"
    name = TextField()
    memo = TextField()
    config = JSONField(default={})
