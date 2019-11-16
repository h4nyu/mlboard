import asyncio
from mlboard.usecases.connectors import TraceUsecase, PointUsecase, WorkspaceUsecase
from mlboard.infra.db.connectors import ContextManager
from random import randint


async def main() -> None:
    async with ContextManager() as conn:
        trace_uc = TraceUsecase(conn)
        point_uc = PointUsecase(conn)
        workspace_uc = WorkspaceUsecase(conn)
        workspace_id = await workspace_uc.register(f'workspace#{randint(0, 1)}', params={
            'lr': 0.01
        })

        for i in range(2):
            await trace_uc.register(f"metric#{randint(0, 1)}", workspace_id)
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
