#!/usr/bin/env python
# -*- coding: utf-8 -*-
from datetime import datetime
from toolz import curry


def check_progress(from_date, to_date, delta):
    if isinstance(from_date, datetime) and isinstance(to_date, datetime):
        return from_date < to_date or from_date + delta < to_date
    else:
        return False


def cast_to_date(from_date, to_date, delta):
    if to_date > from_date + delta:
        return from_date, from_date + delta
    else:
        return from_date, to_date


@curry
def chunks(n, l):
    for i in range(0, len(l), n):
        yield l[i:i+n]
