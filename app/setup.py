#!/usr/bin/env python
# -*- coding: utf-8 -*-

from setuptools import setup, find_packages

requires = [
    "toolz",
    "asyncpg",
    "fastapi",
    "starlette",
    "PyYAML",
    "ujson",
    "requests",
    "python-dateutil",
    "uvicorn",
    "numpy",
]
dev_requires = [
    "pytest",
    "pytest-mock",
    "pytest-cov",
    "flake8",
    "autopep8",
    "pytest-asyncio",
    "profilehooks",
    "mypy",
    "pytest-mypy",
    "typing_extensions",
]

setup(
    name="mlboard",
    version="0.5.0",
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
