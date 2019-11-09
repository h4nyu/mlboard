from mlboard_client.writers import Writer
import pytest


@pytest.fixture
def writer() -> Writer:
    return Writer(
        'http://api:5000', 
        'test',
        {
            'p0': 12,
            'p1': {
                'p3': 'fasdfa'
            },
        }
    )


def test_add_scalar(writer: Writer) -> None:
    for i in range(100):
        writer.add_scaler('aaa/test', i)

def test_add_scalars(writer: Writer) -> None:
    for i in range(1000):
        writer.add_scalers({
            'aaa': i,
            'bbb': i,
            'ccc': i,
        })
