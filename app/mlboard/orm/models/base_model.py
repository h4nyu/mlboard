from peewee import Model
from playhouse.db_url import connect
from mlboard.config import DB_CONN
from .serialize_mixin import SerializeMixIn

db = connect(DB_CONN)


class BaseModel(SerializeMixIn, Model):
    class Meta:
        database = db