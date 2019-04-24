import sqlalchemy as sa
from datetime import datetime
from mlboard.config import TZ
from sqlalchemy.dialects.postgresql import UUID
import uuid


class ConfigMixin(object):
    id = sa.Column(
        UUID,
        primary_key=True,
        server_default="uuid_generate_v4()",
    )
    hash = sa.Column(
        UUID,
        server_default="uuid_generate_v4()",
    )
    create_date = sa.Column(
        sa.DateTime(timezone=True),
        server_default="clock_timestamp()",
    )

    edit_date = sa.Column(
        sa.DateTime(timezone=True),
        server_default="clock_timestamp()",
    )
