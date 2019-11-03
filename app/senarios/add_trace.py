import asyncio
from mlboard.usecases.connectors import get_point_usecase, get_trace_usecase


async def main() -> None:
    trace_uc = get_trace_usecase()
    point_uc = get_point_usecase()
    for i in range(5):
        await trace_uc.register(f"#{i}")
    traces = await trace_uc.all()
    for t in traces:
        await point_uc.add_scalar(t.id, 0.5)
        await point_uc.add_scalar(t.id, 0.1)
        await point_uc.add_scalar(t.id, 0.8)
        await point_uc.add_scalar(t.id, -1.0)


if __name__ == '__main__':
    asyncio.run(main())
