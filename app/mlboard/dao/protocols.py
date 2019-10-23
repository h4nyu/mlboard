from typing_extensions import Protocol
import typing as t

U = t.TypeVar('U')
T = t.TypeVar('T')


class IQuery(Protocol[T, U]):
    conn: t.Any

    def to_model(self, row: t.Any) -> T:
        ...

    def to_models(self, rows: t.List) -> t.List[T]:
        ...

    async def bulk_insert(self, rows: t.List[T]) -> int:
        ...

    async def insert(self, obj: T) -> t.Optional[U]:
        ...

    async def update(self, key: str, value: U, payload: t.Dict[str, t.Any]) -> t.Optional[U]:
        ...

    async def delete(self) -> None:
        ...

    async def delete_by(self, **kwargs: t.Any) -> None:
        ...

    async def all(self) -> t.List[T]:
        ...

    async def get_by(self, **kwargs: t.Any) -> t.Optional[T]:
        ...

    async def filter_by(self, **kwargs: t.Any) -> t.List[T]:
        ...

    async def count_by(self, **kwargs: t.Any) -> int:
        ...
