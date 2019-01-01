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
        CREATE TABLE experiments
            (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                hash uuid NOT NULL DEFAULT uuid_generate_v4(),
                create_date timestamp with time zone NOT NULL DEFAULT clock_timestamp(),
                tag text NOT NULL,
                memo text,
                config json DEFAULT '{}'::json,
                CONSTRAINT tag_unique UNIQUE (tag)
            );

        CREATE TABLE traces
            (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                ts timestamp with time zone NOT NULL DEFAULT clock_timestamp(),
                x double precision,
                y double precision,
                tag text NOT NULL,
                experiment_id uuid NOT NULL
            )
        """
    ))


def downgrade():
    conn = op.get_bind()
    conn.execute(text(
        """
        DROP TABLE experiments;
        DROP TABLE traces;
        DROP EXTENSION "uuid-ossp";
        """
    ))

