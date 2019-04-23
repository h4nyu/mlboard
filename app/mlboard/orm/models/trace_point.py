import sqlalchemy as sa
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.postgresql import UUID
import uuid
Base = declarative_base()


class TracePoint(Base):
    __tablename__ = "trace_points"
    id = sa.Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )
    trace_id = sa.Column(UUID(as_uuid=True))
    x = sa.Column(sa.Float)
    y = sa.Column(sa.Float)
    collect_date = sa.Column(sa.DateTime, default=lambda: datetime.now(TZ))
