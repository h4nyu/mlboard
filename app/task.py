#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import logging
import os
from osca.wait_db import wait_db
from distributed import Client
import dask
import numpy as np
from cytoolz.curried import pipe, filter, first, take, map, concat, compose, keyfilter
from osca.tasks.split_process.batch import dsk as split_process
from osca.tasks.split_event.batch import dsk as split_event
from osca.tasks.extract_process_feature.batch import dsk as extract_process_feature
from osca.tasks.extract_event_feature.batch import dsk as extract_event_feature
from osca.tasks.extract_event_condition.batch import dsk as extract_event_condition
from osca.tasks.summary.sum.batch import dsk as sum_summary
from osca.tasks.summary.statistic.batch import dsk as statistic_summary
from osca.tasks.extract_event_feature_change.batch import dsk as extract_event_feature_change
from osca.tasks.train_state_track_model.batch import dsk as train_state_track_model
from osca.tasks.anomaly_detection.batch import dsk as anomaly_detection
from osca.tasks.anomaly_notification.batch import dsk as anomaly_notification
from osca.tasks.analysis.tree import dsk as tree
from dateutil.relativedelta import relativedelta
from dask.distributed import progress, wait
from datetime import datetime
import time
from pprint import pprint
from osca import logger

if __name__ == "__main__":
    DASK_ADDRESS = os.getenv("DASK_ADDRESS", 'dask-scheduler:8786')
    client = Client(DASK_ADDRESS)
    logger.info(client.scheduler_info()['workers'])
    futures = []
    while True:
        pending_key_set = pipe(
            futures,
            filter(lambda x: x.status == 'pending'),
            map(lambda x: x.key),
            set
        )
        finished_key_set = pipe(
            futures,
            filter(lambda x: x.status == 'finished'),
            map(lambda x: x.key),
            set
        )


        dsk = {
            **split_event(relativedelta(hours=1, minutes=0, second=0, microsecond=0)),
            **extract_event_feature(relativedelta(hours=1, minutes=0, second=0, microsecond=0)),
            **statistic_summary('hour'),
            **statistic_summary('day'),
            **split_process(relativedelta(minutes=10, second=0, microsecond=0)),
            **extract_process_feature(relativedelta(minutes=10, second=0, microsecond=0)),
            **extract_event_condition(relativedelta(hours=1, minutes=0, second=0, microsecond=0)),
            **sum_summary('hour'),
            **sum_summary('day'),
            **extract_event_feature_change(relativedelta(hours=1, minutes=0, second=0, microsecond=0)),
            **tree(),
            **train_state_track_model(),
            **anomaly_detection(relativedelta(hours=1, minutes=0, second=0, microsecond=0)),
            **anomaly_notification(),
        }
        all_key_set = set(dsk.keys())
        req_key_set = all_key_set - pending_key_set
        logger.info(f'new: {len(req_key_set)}, pending: {len(pending_key_set)} finished: {len(finished_key_set)}')
        for f in req_key_set:
            logger.debug(f'{f}')
        futures = client.get(
            keyfilter(lambda k: k in req_key_set)(dsk),
            list(all_key_set),
            sync=False
        )
        time.sleep(1)
