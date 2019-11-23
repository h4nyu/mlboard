#!/usr/bin/env python
# -*- coding: utf-8 -*-

from setuptools import setup, find_packages

requires = [
    "cytoolz",
    "asyncpg<0.19.0",
    "fastapi",
    "PyYAML",
    "requests",
    "python-dateutil",
    "ujson",
    "uvicorn",
]
dev_requires = [
    "pytest",
    "pytest-mock",
    "pytest-cov",
    "flake8",
    "autopep8",
    "pytest-asyncio",
    "mypy",
]

setup(
    name="mlboard",
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
