from mlboard.api import create_app
from starlette.testclient import TestClient
import pytest


@pytest.fixture
def client():
    app = create_app()
    return TestClient(app)
