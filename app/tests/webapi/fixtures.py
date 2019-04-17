from mlboard.webapi import create_app
import pytest


@pytest.fixture
def client():
    app = create_app()
    return app.test_client()
