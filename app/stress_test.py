import pandas as pd
from datetime import datetime, timedelta
from mlboard.config import TZ
import typing
from cytoolz.curried import pipe, map, take, first, concat, filter, sorted, unique
import os
import glob
import shutil
from ujson import dump
import numpy as np
from logging import getLogger, Formatter, StreamHandler, DEBUG
import asyncio
import concurrent.futures

logger = getLogger("stress")
formatter = Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler = StreamHandler()
handler.setLevel(DEBUG)
handler.setFormatter(formatter)
logger.setLevel(DEBUG)
logger.addHandler(handler)
logger.propagate = False

class StressTestWriter:

    def __init__(self,
                 from_date: datetime,
                 dir_path:str,
                 chamber_num:int,
                 sensor_num:int,
                 span=timedelta(seconds=300)):
        self.dir_path = dir_path
        self.chamber_num = chamber_num
        self.sensor_num = sensor_num
        self.config: typing.Dict[str, str] = {}
        self.current_ts = from_date
        self.span = span

    @property
    def current_ts_dir(self):
        year = self.current_ts.year
        month = self.current_ts.month
        day = self.current_ts.day
        path = "{:04}-{:02}-{:02}".format(year, month, day)
        path = os.path.join(self.dir_path, "logs", path)
        return path

    @property
    def columns(self):
        return pipe(
            range(self.sensor_num),
            map(lambda x: f"sensor{x}"),
            list,
        )

    def clear_store(self):
        pipe(
            glob.glob(f"{self.dir_path}/logs/*"),
            map(shutil.rmtree),
            list
        )

        pipe(
            glob.glob(f"{self.dir_path}/meta/*"),
            map(os.remove),
            list
        )

    def gen_config(self):
        self.config = pipe(
            range(self.chamber_num),
            map(lambda x: {
                "name": f"EV#{x}",
                "block": f"BLOCK{x}",
                "sensor_logs": [
                    {
                        "prefix": f"EV{x}",
                        "sensor_file": f"EV{x}.csv"
                    }
                ]
            }),
            list
        )

    def gen_sonsor_config(self):
        log_indexs = list(range(self.sensor_num))
        columns = pipe(
            log_indexs,
            map(lambda x: f"sensor{x}"),
            list,
        )

        units = pipe(
            log_indexs,
            map(lambda x: f"unit{x}"),
            list
        )

        categories = pipe(
            log_indexs,
            map(lambda x: f"categories{x % 5}"),
            list
        )

        df = pd.DataFrame({
            '[LOG_INDEX]': log_indexs,
            "[AddressSetName]": columns,
            "[Unit]": units,
            "[Category]": categories,
        })
        df = df.set_index("[LOG_INDEX]")
        return df


    def write_config(self):
        file_path = f"{self.dir_path}/meta/chambers.json"
        with open(file_path, 'w') as f:
            dump(self.config, f)

    def write_sensor(self, sensor_file):
        df = self.gen_sonsor_config()
        file_path = f"{self.dir_path}/meta/{sensor_file}"
        df.to_csv(file_path)

    def create_sensor_log_dir(self) -> str:
        os.makedirs(self.current_ts_dir, exist_ok=True)

    def create_sensor_log_file(self, log_dir, prefix):
        column_dict = pipe(
            self.columns,
            map(lambda x: (x, [])),
            dict,
        )
        df = pd.DataFrame({
            'LOGID': [],
            "DATE": [],
            "TIME": [],
            **column_dict,
        })
        df = df.set_index("LOGID")

        path = os.path.join(log_dir, f"{prefix}.csv")
        df.to_csv(path)

    def append_sensor_log(self, prefix):
        path = os.path.join(self.current_ts_dir, f"{prefix}.csv")
        df = pd.read_csv(path)
        for i in range(self.span.seconds):
            ts = self.current_ts + timedelta(seconds=i)
            column_dict = pipe(
                self.columns,
                map(lambda x: (x, np.random.random_sample() - 0.5)),
                dict,
            )
            df = df.append({
                'DATE': "{:04}-{:02}-{:02}".format(ts.year, ts.month, ts.day),
                "TIME": "{:02}:{:02}:{:02}".format(ts.hour, ts.minute, ts.second),
                **column_dict,
            }, ignore_index=True)
        df.to_csv(path)
        return self.span.seconds

    def before_serve(self):
        self.clear_store()
        self.gen_config()
        self.write_config()
        sensor_files = pipe(
            self.config,
            map(lambda x: x['sensor_logs'][0]['sensor_file']),
            list
        )

        pipe(
            sensor_files,
            map(self.write_sensor),
            list
        )
        self.create_sensor_log_dir()

        sensor_prefixs = pipe(
            self.config,
            map(lambda x: x['sensor_logs'][0]['prefix']),
            map(lambda x: self.create_sensor_log_file(self.current_ts_dir, x)),
            list
        )

    async def poll(self):
        loop = asyncio.get_running_loop()
        self.create_sensor_log_dir()
        with concurrent.futures.ProcessPoolExecutor(max_workers=4) as pool:
            cors = pipe(
                self.config,
                map(lambda x: x['sensor_logs'][0]['prefix']),
                map(lambda x: loop.run_in_executor(pool, self.append_sensor_log, x)),
                list,
            )
            results = await asyncio.gather(*cors)
            count = sum(results)
        self.current_ts = self.current_ts + self.span
        logger.info(f"{self.current_ts} write {count}")


    async def __call__(self):
        self.before_serve()
        while True:
            await self.poll()





if __name__ == '__main__':
    writer = StressTestWriter(
        from_date = datetime.now(TZ) - timedelta(days=30),
        dir_path="/store",
        chamber_num=90,
        sensor_num=50,
    )
    asyncio.run(writer())

