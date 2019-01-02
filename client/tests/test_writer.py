import pytest
from onikuflow_client.writer import SummaryWriter


@pytest.fixture
def writer():
    return SummaryWriter('http://api:5000', 'mock-experiment')


def test_writer(writer):
    for i in range(10):
        writer.add_scalar('test', 1, i)
