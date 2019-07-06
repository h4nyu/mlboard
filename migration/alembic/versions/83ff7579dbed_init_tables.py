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

        CREATE TABLE chambers
            (
                id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
                create_date timestamp with time zone NOT NULL DEFAULT clock_timestamp(),
                name text NOT NULL,
                block_name text NOT NULL,
                warning_count integer NOT NULL,
                error_count integer NOT NULL,

                value double precision,
                status integer NOT NULL,
                collect_date timestamp with time zone,

                CONSTRAINT uq_chambers_name_block_name UNIQUE (name, block_name)
            );

        CREATE TABLE trace_levels
            (
                id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
                create_date timestamp with time zone NOT NULL DEFAULT clock_timestamp(),
                warning_level double precision NOT NULL,
                error_level double precision NOT NULL
            );

        CREATE TABLE sensors
            (
                id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
                create_date timestamp with time zone NOT NULL DEFAULT clock_timestamp(),
                name text NOT NULL,
                chamber_id uuid NOT NULL,
                log_define_id uuid NOT NULL,
                col_name text NOT NULL,
                unit text,
                category_name text,

                value double precision,
                status integer NOT NULL,
                collect_date timestamp with time zone,

                CONSTRAINT uq_sensors_col_name_log_defin_id UNIQUE (col_name, log_define_id)
            );

        CREATE TABLE processes
            (
                id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
                create_date timestamp with time zone NOT NULL DEFAULT clock_timestamp(),
                name text NOT NULL,
                unit text,
                chamber_id uuid NOT NULL,
                log_define_id uuid NOT NULL,

                state integer NOT NULL,
                value double precision,
                status integer NOT NULL,
                collect_date timestamp with time zone
            );


        CREATE TABLE progresses
            (
                id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
                create_date timestamp with time zone NOT NULL DEFAULT clock_timestamp(),
                ts timestamp with time zone NOT NULL,
                config_id uuid NOT NULL,
                config_type text NOT NULL,
                CONSTRAINT uq_progresses_config_id_name UNIQUE (config_id, config_type)
            );

        CREATE TABLE log_defines
            (
                id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
                create_date timestamp with time zone NOT NULL DEFAULT clock_timestamp(),
                prefix text NOT NULL,
                log_type text NOT NULL,
                CONSTRAINT uq_log_defines_prefix_log_type UNIQUE (prefix, log_type)
            );

        CREATE TABLE state_sections
            (
                id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
                from_date timestamp with time zone NOT NULL,
                to_date timestamp with time zone NOT NULL,
                state integer NOT NULL,
                log_define_id uuid NOT NULL
            );

        CREATE TABLE traces
            (
                ts timestamp with time zone NOT NULL DEFAULT clock_timestamp(),
                value double precision,
                config_id uuid NOT NULL
            );
        SELECT create_hypertable('traces', 'ts');
        """
    ))


def downgrade():
    conn = op.get_bind()
    conn.execute(text(
        """
        DROP TABLE chambers;
        DROP TABLE sensors;
        DROP TABLE processes;
        DROP TABLE progresses;
        DROP TABLE trace_levels;
        DROP TABLE log_defines;
        DROP TABLE state_sections;
        DROP TABLE traces CASCADE;
        DROP EXTENSION "uuid-ossp";
        """
    ))
