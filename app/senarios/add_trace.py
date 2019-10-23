import asyncio
from mlboard.models.trace import Trace
from mlboard.queries.trace import TraceQuery
from mlboard.queries import get_conn
from mlboard.usecases.trace import create_usecase


async def main():
    async with get_conn() as conn:
        uc = create_usecase(conn)
        for i in range(5):
            await uc.register_trace(f"#{i}")


if __name__ == '__main__':
    asyncio.run(main())
