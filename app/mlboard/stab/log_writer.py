import time
import random
import gc
import os
from datetime import datetime
from toolz.curried import pipe, map, take, first, concat, filter
from logging import getLogger
import pandas as pd
import json
import glob
logger = getLogger("LogWriter")


class LogWriter(object):
    def __init__(self, store_dir):
        self.base_dir = store_dir

    @property
    def log_dir(self):
        return f"{self.base_dir}/logs"

    @property
    def meta_dir(self):
        return f"{self.base_dir}/meta"

    def poll(self):
        now = datetime.now()
        date_str = f"{now.date()}"
        time_str = f"{now.time()}"
        fname = f"{self.log_dir}/EV_{date_str}.csv"
        df = pd.DataFrame({
            'LOG ID': [0],
            'DATE': [date_str],
            'TIME': [time_str],
            "SHIFT_0_SPEED": [random.uniform(0, 1)],
            "SHIFT_1_SPEED": [random.uniform(0, 1)],
        })
        logger.info(f'write ')
        if not os.path.isfile(fname):
            df.to_csv(fname)
        else:
            df.to_csv(fname, mode='a', header=False)

    def write_sensor_file(self):
        sensor_df = pd.DataFrame({
            '[LOG]': ["EV", "EV"],
            '[LOG_INDEX]': [0, 1],
            "[AddressSetName]": ["SHIFT_0_SPEED", "SHIFT_1_SPEED"],
            "[Unit]": ["Pa", "m/s",],
            "[WarnLevel]": [0.6, 0.5],
            "[ErrorLevel]": [0.8, 0.3],
            "[TriggerType]": ['raising', 'falling'],
        })
        sensor_df = sensor_df.set_index("[LOG_INDEX]")
        sensor_fn = f"{self.meta_dir}/test0.csv"
        sensor_df.to_csv(sensor_fn)

        sensor_df = pd.DataFrame({
            '[LOG]': ["EV", "EV"],
            '[LOG_INDEX]': [1, 2],
            "[AddressSetName]": ["SHIFT_1_SPEED", "SHIFT_2_SPEED"],
            "[Unit]": ["m/s", ""],
            "[WarnLevel]": [ 0.5, ""],
            "[ErrorLevel]": [0.3, ""],
            "[TriggerType]": ['falling', ""],
        })
        sensor_df = sensor_df.set_index("[LOG_INDEX]")
        sensor_fn = f"{self.meta_dir}/test1.csv"
        sensor_df.to_csv(sensor_fn)

    def write_camber_config(self):
        chamber_config = [
            {
                "name": "EV1A",
                "block": "BLOCK1",
                "sensor_files": [
                    "test0.csv"
                ]
            },
            {
                "name": "EV1B",
                "block": "BLOCK1",
                "sensor_files": [
                    "test1.csv"
                ]
            }
        ]
        filename = f"{self.meta_dir}/chambers.json"

        with open(filename, 'w') as f:
            json.dump(chamber_config, f)

    def before_sereve(self):
        self.write_sensor_file()
        self.write_camber_config()

    def serve(self):
        self.before_sereve()
        while True:
            self.poll()
            time.sleep(1)
            gc.collect()
