from .mixins import ConfigMixin
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import JSON
from .base_model import Base


class Experiment(ConfigMixin, Base):
    __tablename__ = "experiments"
    name = sa.Column(sa.Text)
    memo = sa.Column(sa.Text)
    config = sa.Column(JSON)
