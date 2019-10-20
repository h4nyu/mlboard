"""init tables

Revision ID: 83ff7579dbed
Revises:
Create Date: 2018-12-29 16:25:57.277243

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import text


# revision identifiers, used by Alembic.
revision = '83ff7579dbed'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    conn = op.get_bind()
    conn.execute(text(
        """
        CREATE EXTENSION "uuid-ossp";

        CREATE TABLE points
            (
                ts timestamp with time zone NOT NULL DEFAULT clock_timestamp(),
                value double precision,
                trace_id uuid NOT NULL
            );
        CREATE INDEX on points (trace_id);
        SELECT create_hypertable('points', 'ts', chunk_time_interval => interval '1 hour');
        CREATE TABLE traces
            (
                id uuid NOT NULL PRIMARY KEY,
                tag text NOT NULL UNIQUE,
                created_at timestamp with time zone NOT NULL,
                updated_at timestamp with time zone NOT NULL
            );
        """
    ))


def downgrade():
    conn = op.get_bind()
    conn.execute(text(
        """
        DROP TABLE points CASCADE;
        DROP TABLE traces CASCADE;
        DROP EXTENSION "uuid-ossp";
        """
    ))
