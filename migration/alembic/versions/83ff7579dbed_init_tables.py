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

        CREATE TABLE traces
            (
                id uuid NOT NULL PRIMARY KEY,
                name text NOT NULL,
                created_at timestamp with time zone NOT NULL,
                updated_at timestamp with time zone NOT NULL,
                UNIQUE (name)
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
        DROP TABLE traces CASCADE;
        DROP TABLE workspaces CASCADE;
        DROP EXTENSION "uuid-ossp";
        """
    ))
