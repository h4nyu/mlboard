from .mixins import ConfigMixin
import sqlalchemy as sa
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.postgresql import JSON
Base = declarative_base()


class Experiment(ConfigMixin, Base):
    __tablename__ = "experiments"
    name = sa.Column(sa.Text)
    memo = sa.Column(sa.Text)
    config = sa.Column(JSON)

    def to_dict(self):
        return {c.key: getattr(self, c.key) for c in self.__mapper__.columns}
