#!/usr/bin/env python
# -*- coding: utf-8 -*-
import datetime
import dateutil
import functools
from toolz.curried import keymap, merge, filter, pipe


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
            if '_ts' in k and isinstance(v, str):
                return dateutil.parser.parse(v)
            else:
                return v

        kwargs = {k: _f(k, v) for k, v in kwargs.items()}
        return func(*args, **kwargs)
    return wapper
