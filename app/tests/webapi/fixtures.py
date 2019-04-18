from mlboard.webapi import create_app
import pytest
from starlette.testclient import TestClient


@pytest.fixture
def client():
    app = create_app()
    return TestClient(app)
