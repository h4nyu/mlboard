"""add_maintenance_tables

Revision ID: 0c99a1a9df05
Revises: ec5b9c609707
Create Date: 2019-05-07 09:42:10.108419

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import text


# revision identifiers, used by Alembic.
revision = '0c99a1a9df05'
down_revision = 'ec5b9c609707'
branch_labels = None
depends_on = None


def upgrade():
    conn = op.get_bind()
    conn.execute(text(
        """
        CREATE TABLE maintenances
            (
                id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
                create_date timestamp with time zone NOT NULL DEFAULT clock_timestamp(),
                name text NOT NULL,
                chamber_id uuid NOT NULL,

                value double precision,
                status integer NOT NULL,
                collect_date timestamp with time zone,

                CONSTRAINT uq_maintenances_chamber_id_name UNIQUE (chamber_id, name)
            );

        CREATE TABLE trace_events
            (
                id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
                create_date timestamp with time zone NOT NULL DEFAULT clock_timestamp(),
                occurred_date timestamp with time zone NOT NULL,
                config_id uuid NOT NULL,
                name text NOT NULL,
                payload json NOT NULL
            );

        CREATE TABLE maintenance_logs
            (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                create_date timestamp with time zone NOT NULL DEFAULT clock_timestamp(),
                maintenance_id uuid NOT NULL,
                occurred_date timestamp with time zone NOT NULL
            );

        SELECT create_hypertable('maintenance_logs', 'occurred_date');


        """
    ))


def downgrade():
    conn = op.get_bind()
    conn.execute(text(
        """
        DROP TABLE maintenance_logs;
        DROP TABLE trace_events;
        DROP TABLE maintenances;
        """
    ))
