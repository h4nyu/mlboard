#!/usr/bin/env python
# -*- coding: utf-8 -*-
import pytest
from mlboard_client.writer import SummaryWriter
import random


@pytest.mark.parametrize("id", [1, 2, 3])
def test_insert(id):
    writer = SummaryWriter("http://api:5000", f'test_{id}')
    writer.update_config({'aaa': 'bbb'})
    for i in range(10):
        writer.add_scalar('metric-0', random.uniform(0, 1), i)
        writer.add_scalar('metric-1', random.uniform(0, 1), i)
        writer.add_scalar('metric-2', random.uniform(0, 1), i)
