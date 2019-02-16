import os
import yaml
from dateutil import tz

__all__ = ["DB_CONN"]

config_path = os.getenv("MLBOARD_CONFIG_PATH", '/srv/mlboard.yml')
with open(config_path, 'r') as ymlfile:
    config = yaml.load(ymlfile)


DB_CONN = config['DB_CONN']
