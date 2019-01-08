#!/usr/bin/env python
# -*- coding: utf-8 -*-
import pytest
from mlboard_api import create_app


@pytest.fixture
def app():
    app = create_app()
    return app.test_client()


def test_all_table(app):
    res = app.get('/')
    assert res.status_code == 200
