from .base_query import BaseQuery
from dataclasses import fields, asdict
from cytoolz.curried import pipe, map
import ujson
import uuid
from dataclasses import dataclass
from .. import models as ms


class Experiment(BaseQuery):

    async def upsert(self, experiment) -> uuid.UUID:
        keys = [f.name for f in fields(experiment)]
        keys_str = ",".join(keys)
        value_map_str = ",".join(
            [f"${i}" for i, _ in enumerate(keys, start=1)])
        update_map_str = ",".join(
            [f"{k}=${i}" for i, k in enumerate(keys, start=1)])
        sql = f"""
            INSERT INTO {ms.Experiment.Config.table_name} ({keys_str})
            VALUES ({value_map_str})
            ON CONFLICT ON CONSTRAINT uq_experiment_name
            DO UPDATE SET {update_map_str}
            RETURNING id
        """
        params = [getattr(experiment, k) for k in keys]
        queried_id = await self.conn.fetchval(
            sql,
            *params
        )
        return queried_id

    async def delete_by(self, id) -> uuid.UUID:
        sql = f"""
            DELETE FROM {self.table_name}
            WHERE id = $1
            RETURNING id
        """
        queried_id = await self.conn.fetchval(
            sql,
            id
        )
        return queried_id
