#!/usr/bin/env python
# -*- coding: utf-8 -*-
import datetime
import dateutil
import functools
from cytoolz.curried import keymap, merge, filter, pipe


def map_kwargs(bind={}):
    def bind_kwargs(func):
        def wapper(*args):
            _dict = pipe(args,
                         filter(lambda x: isinstance(x, dict)),
                         merge,
                         keymap(lambda x: bind[x] if x in bind else x))
            _args = pipe(args,
                         filter(lambda x: not isinstance(x, dict)),
                         list)
            return func(*_args, **_dict)
        wapper.__name__ = func.__name__
        return wapper
    return bind_kwargs


def kwargs_cast(func):
    @functools.wraps(func)
    def wapper(*args, **kwargs):
        def _f(k, v):
            if 'date' in k and isinstance(v, str):
                return dateutil.parser.parse(v)
            else:
                return v

        kwargs = {k: _f(k, v) for k, v in kwargs.items()}
        return func(*args, **kwargs)
    return wapper


def without_timezone(func):
    @functools.wraps(func)
    def wapper(*args, **kwargs):
        def rmTimezone(v):
            if isinstance(v, datetime.datetime):
                local_time = v.astimezone()
                return local_time.replace(tzinfo=None)
            else:
                return v

        args = [rmTimezone(v) for v in args]
        kwargs = {k: rmTimezone(v) for k, v in kwargs.items()}
        return func(*args, **kwargs)
    return wapper
