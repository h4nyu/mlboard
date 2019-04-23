#!/usr/bin/env python

# -*- coding: utf-8 -*-
from setuptools import setup, find_packages

install_reqs = [
    "SQLAlchemy",
    "cytoolz",
    "fastapi",
    "pyyaml",
    "python-dateutil",
    "databases",
    "asyncpg",
    "uvicorn",
]

dev_reqs = [
    "pytest",
    "pytest-asyncio",
    'faker',
    'requests',
]

setup(
    name="mlboard",
    version="0.3.0",
    description="TODO",
    author='Xinyuan Yao',
    author_email='yao.ntno@google.com',
    license="TODO",
    packages=find_packages(),
    install_requires=install_reqs,
    extras_require={
        'dev': dev_reqs,
    }
)
