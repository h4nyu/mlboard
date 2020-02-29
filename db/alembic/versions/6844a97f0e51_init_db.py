"""init db

Revision ID: 6844a97f0e51
Revises: 
Create Date: 2020-02-29 02:44:16.353030

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import text


# revision identifiers, used by Alembic.
revision = '6844a97f0e51'
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
        SELECT create_hypertable('points', 'ts', chunk_time_interval => interval '2 day');
        CREATE TABLE traces
            (
                id uuid NOT NULL PRIMARY KEY,
                name text NOT NULL,
                workspace_id uuid NOT NULL,
                created_at timestamp with time zone NOT NULL,
                updated_at timestamp with time zone NOT NULL,
                UNIQUE (name, workspace_id)
            );
        CREATE TABLE workspaces
            (
                id uuid NOT NULL PRIMARY KEY,
                name text NOT NULL UNIQUE,
                params json NOT NULL,
                created_at timestamp with time zone NOT NULL
            );
        """
    ))


def downgrade():
    conn = op.get_bind()
    conn.execute(text(
        """
        DROP TABLE points CASCADE;
        DROP TABLE traces CASCADE;
        DROP TABLE workspaces CASCADE;
        DROP EXTENSION "uuid-ossp";
        """
    ))
