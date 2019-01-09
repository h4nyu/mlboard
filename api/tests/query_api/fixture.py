from mlboard_api import create_app
import pytest


@pytest.fixture
def app():
    app = create_app()
    return app.test_client()
