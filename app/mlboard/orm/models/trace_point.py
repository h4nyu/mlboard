from .base_model import Base
import sqlalchemy as sa
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.postgresql import UUID
import uuid


class TracePoint(Base):
    __tablename__ = "trace_points"
    id = sa.Column(
        UUID,
        primary_key=True,
        server_default="uuid_generate_v4()",
    )
    trace_id = sa.Column(UUID)
    x = sa.Column(sa.Float)
    y = sa.Column(sa.Float)
    ts = sa.Column(
        sa.DateTime(timezone=True),
        server_default="clock_timestamp()"
    )
