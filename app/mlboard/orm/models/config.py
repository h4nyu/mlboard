import sqlalchemy as sa
from datetime import datetime
from mlboard.config import TZ
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.postgresql import UUID
import uuid
from .mixins import ConfigMixin

Base = declarative_base()

class Config(ConfigMixin, Base):
    __tablename__ = "configs"
