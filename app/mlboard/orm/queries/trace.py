from .base_query import BaseQuery
from .. import db
import uuid
from dataclasses import fields, asdict


class Trace(BaseQuery):

    async def filter_by(self, experiment_id) -> uuid.UUID:
        sql = f"""
            SELECT * FROM {self.table_name}
            WHERE experiment_id = $1
        """
        rows = await self.conn.fetch(
            sql,
            experiment_id
        )
        return self.to_models(rows)

    async def upsert(self, experiment) -> uuid.UUID:
        keys = [f.name for f in fields(experiment)]
        keys_str = ",".join(keys)
        value_map_str = ",".join(
            [f"${i}" for i, _ in enumerate(keys, start=1)])
        update_map_str = ",".join(
            [f"{k}=${i}" for i, k in enumerate(keys, start=1)])
        sql = f"""
            INSERT INTO {self.table_name} ({keys_str})
            VALUES ({value_map_str})
            ON CONFLICT ON CONSTRAINT uq_trace_name_experiment_id
            DO UPDATE SET {update_map_str}
            RETURNING id
        """
        params = [getattr(experiment, k) for k in keys]
        queried_id = await self.conn.fetchval(
            sql,
            *params
        )
        return queried_id
