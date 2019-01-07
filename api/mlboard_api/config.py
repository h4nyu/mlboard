import os
import yaml

config_path = os.getenv("MLBOARD_CONFIG_PATH", '/srv/mlboard.yml')
with open(config_path, 'r') as ymlfile:
    config = yaml.load(ymlfile)
