"""add event tables

Revision ID: ec5b9c609707
Revises: 83ff7579dbed
Create Date: 2019-04-12 10:03:38.262490

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import text


# revision identifiers, used by Alembic.
revision = 'ec5b9c609707'
down_revision = '83ff7579dbed'
branch_labels = None
depends_on = None


def upgrade():
    conn = op.get_bind()
    conn.execute(text(
        """
        CREATE TABLE event_sections
            (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                from_date timestamp with time zone NOT NULL,
                to_date timestamp with time zone NOT NULL,
                message text,
                code integer NOT NULL,
                status integer NOT NULL,
                chamber_id uuid NOT NULL,
                substract_id text
            );
        """
    ))


def downgrade():
    conn = op.get_bind()
    conn.execute(text(
        """
        DROP TABLE event_sections;
        """
    ))
