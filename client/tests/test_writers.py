from mlboard_client.writers import Writer
from random import random
import pytest


@pytest.fixture
def writer() -> Writer:
    return Writer(
        'http://web/api/',
        'test0',
        {
            'p0': 12,
            'p1': {
                'p3': 'fasdfa'
            },
        }
    )


def test_add_scalar(writer: Writer) -> None:
    writer.add_scaler('aaa/test', 1)

def test_add_scalars(writer: Writer) -> None:
    for i in range(10000):
        writer.add_scalers({
            'aaa': random(),
            'bbb': random(),
            'ccc': random(),
        })
