import os
import yaml
from dateutil import tz
__all__ = ["DB_CONN", "TZ", "STORE_DIR"]

config_path = os.getenv("MLBOARD_CONFIG_PATH", '/srv/app.yml')
with open(config_path, 'r') as ymlfile:
    config = yaml.safe_load(ymlfile)


DB_CONN = config['DB_CONN']
TZ = tz.gettz(config['TZ'])
STORE_DIR = config['STORE_DIR']
