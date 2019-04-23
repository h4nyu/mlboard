from .mixins import ConfigMixin
import sqlalchemy as sa
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.postgresql import UUID
Base = declarative_base()


class Trace(ConfigMixin, Base):
    __tablename__ = "traces"
    name = sa.Column(sa.Text)
    experiment_id = sa.Column(UUID)
