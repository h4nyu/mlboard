import sqlalchemy as sa
from datetime import datetime
from mlboard.config import TZ
from sqlalchemy.dialects.postgresql import UUID
import uuid


class ConfigMixin(object):
    id = sa.Column(UUID, primary_key=True)
    hash = sa.Column(UUID, default=uuid.uuid4)
    create_date = sa.Column(sa.DateTime(timezone=True),
                            default=lambda: datetime.now(TZ))

