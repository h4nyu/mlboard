from mlboard_client.writers import Writer
import pytest


@pytest.fixture
def writer() -> Writer:
    return Writer('http://api:5000')


def test_add_scalar(writer: Writer) -> None:
    writer.add_scaler('aaa/test', 12)
