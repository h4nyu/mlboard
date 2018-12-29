import os
from pathlib import Path
from onikuflow.config import config as onikuflow_cfg

def initdb():
    # alembic adds significant import time, so we import it lazily
    from alembic import command
    from alembic.config import Config
    package_dir = os.path.dirname(os.path.abspath(__file__))
    migration_dir = os.path.join(package_dir, 'migrations')
    alembic_cfg = Config(os.path.join(package_dir, 'alembic.ini'))
    alembic_cfg.set_main_option('script_location', migration_dir)
    alembic_cfg.set_main_option('sqlalchemy.url', onikuflow_cfg['sql_alchemy_conn'])
    command.upgrade(alembic_cfg, 'heads')
