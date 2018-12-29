import os
import yaml
os.getenv("ONIKUFLOW_CONFIG_PATH", '/srv/onikuflow.yml')

with open("/srv/onikuflow.yml", 'r') as ymlfile:
    config = yaml.load(ymlfile)
