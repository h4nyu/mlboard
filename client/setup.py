#!/usr/bin/env python
# -*- coding: utf-8 -*-

from setuptools import setup, find_packages

requires = [
    "cytoolz",
    "uvicorn",
    "fastapi",
    "pyyaml",
    "asyncpg",
    "ujson",
]
dev_requires = [
    "requests",
    "pytest",
    "pytest-mock",
    "pytest-cov",
    "faker",
    "flake8",
    "autopep8",
    "pytest-asyncio",
    "profilehooks",
    "mypy",
    "pytest-mypy",
    "typing_extensions",
]

setup(
    name="mlboard_client",
    version="0.0.0",
    description="TODO",
    author='Xinyuan Yao',
    author_email='yao.ntno@google.com',
    license="TODO",
    packages=find_packages(),
    install_requires=requires,
    extras_require={
        'dev': dev_requires
    }
)
