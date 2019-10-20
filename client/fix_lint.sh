#!/bin/sh
autopep8 -ivr . && flake8 --show-source .
