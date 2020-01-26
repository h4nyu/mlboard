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

        for i in range(100):
            await trace_uc.register(f"metric#{i}", workspace_id)
        traces = await trace_uc.all()


        for i in range(1000):
            print("insert")
            values = {
                trace.id: randint(0, 100)
                for trace
                in traces
            }
            await point_uc.add_scalars(values)

if __name__ == '__main__':
    asyncio.run(main())
