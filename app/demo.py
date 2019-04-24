from mlboard.orm import queries as qs
from cytoolz.curried import pipe, map, first, itemfilter, reduce, concat
from mlboard.orm import models as ms
from mlboard.orm import db
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

    await qs.Experiment.bulk_insert(expriments)
    traces = pipe(
        expriments,
        map(lambda x: ms.Trace(
            id=uuid.uuid4(),
            experiment_id=x.id,
            name=fake.name(),
        )),
        list,
    )
    await qs.Trace.bulk_insert(traces)
    trace_points = pipe(
        traces,
        map(lambda x: get_dummy_points(x.id)),
        concat,
        list
    )
    qs.TracePoint.bulk_insert(trace_points)

    await db.disconnect()
    print('aaa')


loop = asyncio.get_event_loop()
loop.run_until_complete(main())
