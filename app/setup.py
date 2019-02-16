#!/usr/bin/env python

# -*- coding: utf-8 -*-

try:  # for pip >= 10
    from pip._internal.req import parse_requirements
except ImportError:  # for pip <= 9.0.3
    from pip.req import parse_requirements
try:  # for pip >= 10
    from pip._internal.download import PipSession
except ImportError:  # for pip <= 9.0.3
    from pip.download import PipSession
from setuptools import setup, find_packages

install_reqs = parse_requirements(
    'requirements.txt',
    session=PipSession,
)

install_reqs = [str(ir.req) for ir in install_reqs]

dev_reqs = parse_requirements(
    'dev-requirements.txt',
    session=PipSession
)

dev_reqs = [str(ir.req) for ir in dev_reqs]


setup(
    name="mlboard",
    version="0.0.0",
    description="TODO",
    author='Xinyuan Yao',
    author_email='yao.ntno@google.com',
    license="TODO",
    packages=find_packages(),
    setup_requires=[
        "pip-tools"
    ],
    install_requires=install_reqs,
    extras_require={
        'dev': dev_reqs,
    }
)
