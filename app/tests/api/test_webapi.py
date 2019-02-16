#!/usr/bin/env python
# -*- coding: utf-8 -*-
import pytest
from mlboard import create_api


@pytest.fixture
def app():
    app = create_api()
    return app.test_client()


def test_all_table(app):
    res = app.get('/')
    assert res.status_code == 200
