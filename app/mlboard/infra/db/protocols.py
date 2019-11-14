import typing as t
from mlboard.queries.protocols import IConnection
from types import TracebackType


class IContextManager(t.Protocol):
    async def __aenter__(self) -> IConnection: ...

    async def __aexit__(
        self,
        exc_type: t.Optional[t.Type[BaseException]],
        exc_value: t.Optional[BaseException],
        traceback: t.Optional[TracebackType]
    ) -> None: ...
