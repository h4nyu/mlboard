from mlboard.infra.web import create_app
from starlette.testclient import TestClient
import pytest


@pytest.fixture
def client() -> TestClient:
    app = create_app()
    return TestClient(app)
