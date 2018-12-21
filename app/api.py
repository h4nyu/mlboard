#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import subprocess
import multiprocessing
import os

if __name__ == "__main__":
    core_num = multiprocessing.cpu_count()
    API_WORKER_NUM = os.getenv("API_WORKER_NUM", core_num)
    API_TIMEOUT = os.getenv("API_TIMEOUT", 30)
    cmd = [
        "gunicorn",
        "app:app",
        "--bind",
        "0.0.0.0:8000",
        "--workers={}".format(API_WORKER_NUM),
        "--log-level=info",
        "--reload",
        "--timeout={}".format(API_TIMEOUT),
    ]
    subprocess.call(cmd)
