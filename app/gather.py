import asyncio
from mlboard.core import models as ms
from mlboard.core import queries as qs
from mlboard.core import db
from cytoolz.curried import pipe, map, take, first, concat, filter, sorted, unique, partition
import uuid
import random
import datetime


async def main():
    async with db:
        async def db_lookup():
            await db.fetch_one("SELECT pg_sleep(1)")
        await db_lookup(),
        results = await asyncio.gather(
            db_lookup(),
            db_lookup()
        )

loop = asyncio.get_event_loop()
start = datetime.datetime.now()
loop.run_until_complete(main())
end = datetime.datetime.now()
duration = end - start
