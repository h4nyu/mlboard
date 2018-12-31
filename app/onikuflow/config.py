import os
import yaml

config_path = os.getenv("ONIKUFLOW_CONFIG_PATH", '/srv/onikuflow.yml')
with open(config_path, 'r') as ymlfile:
    config = yaml.load(ymlfile)
