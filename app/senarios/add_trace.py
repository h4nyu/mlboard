import asyncio
from mlboard.usecases.trace import create_usecase as TraceUsecase
from mlboard.usecases.point import create_usecase as PointUsecase


async def main():
    trace_uc = TraceUsecase()
    point_uc = PointUsecase()
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
