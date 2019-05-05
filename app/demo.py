from mlboard.orm import queries as qs
from cytoolz.curried import pipe, map, first, itemfilter, reduce, concat
from mlboard.orm import models as ms
from mlboard.orm import db, get_conn
import cytoolz
from faker import Faker
import asyncio
import uuid
import random
import datetime
fake = Faker()

def get_dummy_points(trace_id):
    return pipe(
        range(100),
        map(lambda _: ms.TracePoint(
            trace_id=trace_id,
            x=random.random(),
            y=random.random(),
        )),
        list
    )


async def main():
    await db.connect()
    expriments = pipe(
        range(5),
        map(lambda _: ms.Experiment(
            id=uuid.uuid4(),
            name=fake.name(),
            memo=fake.text(),
            score=0.6,
            config={
                "loss": 1,
                "layer": 2,
                "train": {
                    "lr": 0.001,
                    "loss": "lovaz"
                },
                "fold": 4,
            }
        )),
        list
    )

    for e in expriments:
        async with get_conn() as conn:
            await qs.Experiment(conn).upsert(e)

    traces = pipe(
        expriments,
        map(lambda x: ms.Trace(
            id=uuid.uuid4(),
            experiment_id=x.id,
            name=fake.name(),
        )),
        list,
    )
    for t in traces:
        async with get_conn() as conn:
            await qs.Trace(conn).upsert(t)

    trace_points = pipe(
        traces,
        map(lambda x: get_dummy_points(x.id)),
        concat,
        list
    )
    async with get_conn() as conn:
        await qs.TracePoint(conn).bulk_insert(trace_points)

    await db.disconnect()


loop = asyncio.get_event_loop()
loop.run_until_complete(main())
