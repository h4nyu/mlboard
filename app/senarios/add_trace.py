import asyncio
from mlboard.usecases.connectors import get_point_usecase, get_trace_usecase, get_workspace_usecase
from random import randint


async def main() -> None:
    trace_uc = get_trace_usecase()
    point_uc = get_point_usecase()
    workspace_uc = get_workspace_usecase()
    workspace_id = await workspace_uc.register(f'workspace#{randint(0, 9)}', params={
        'lr': 0.01
    })

    for i in range(2):
        await trace_uc.register(f"metric#{randint(0, 5)}", workspace_id)
    traces = await trace_uc.all()

    for t in traces:
        await point_uc.add_scalar(t.id, 0.5)
        await asyncio.sleep(0.5)
        await point_uc.add_scalar(t.id, 0.1)
        await asyncio.sleep(0.5)
        await point_uc.add_scalar(t.id, 0.8)
        await asyncio.sleep(0.5)
        await point_uc.add_scalar(t.id, -1.0)


if __name__ == '__main__':
    asyncio.run(main())
