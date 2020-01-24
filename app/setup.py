#!/usr/bin/env python
# -*- coding: utf-8 -*-

from setuptools import setup, find_packages
from pip.req import parse_requirements

install_requires = parse_requirements('/srv/requirements.txt')
dev_requires = parse_requirements('/srv/dev_requirements.txt')

setup(
    name="mlboard",
    version="0.0.0",
    description="TODO",
    author='Xinyuan Yao',
    author_email='yao.ntno@google.com',
    license="TODO",
    packages=find_packages(),
    install_requires=install_requires,
    extras_require={
        'dev': dev_requires
    }
)
