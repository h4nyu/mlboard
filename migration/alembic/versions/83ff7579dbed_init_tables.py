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
    conn.execute(text( """
        CREATE EXTENSION "uuid-ossp";

        CREATE TABLE configs
            (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                hash uuid NOT NULL DEFAULT uuid_generate_v4(),
                create_date timestamp with time zone DEFAULT clock_timestamp(),
                edit_date timestamp with time zone DEFAULT clock_timestamp(),
                is_deleted boolean DEFAULT false
            );

        CREATE TABLE experiments
            (
                name text,
                memo text,
                config json DEFAULT '{}'::json,
                CONSTRAINT uq_experiment_name UNIQUE (name)
            ) INHERITS (configs);

        CREATE TABLE traces
            (
                name text,
                experiment_id uuid NOT NULL,
                CONSTRAINT uq_trace_name_experiment_id UNIQUE (name, experiment_id)
            ) INHERITS (configs);


        CREATE TABLE trace_points
            (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                ts timestamp with time zone NOT NULL DEFAULT clock_timestamp(),
                x double precision NOT NULL,
                y double precision NOT NULL,
                trace_id uuid NOT NULL
            );

        """
    ))


def downgrade():
    conn = op.get_bind()
    conn.execute(text(
        """
        DROP TABLE experiments;
        DROP TABLE trace_points;
        DROP TABLE traces;
        DROP EXTENSION "uuid-ossp";
        """
    ))

