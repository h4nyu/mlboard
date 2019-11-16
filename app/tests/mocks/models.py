from mlboard.models.trace import Trace
from datetime import datetime
from uuid import uuid4
__all__ = [
    'trace'
]

trace = Trace(
    name="trace",
    workspace_id=uuid4(),
    updated_at=datetime.utcnow(),
    created_at=datetime.utcnow(),
)
