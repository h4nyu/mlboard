import pytest
import random
from onikuflow_client.writer import SummaryWriter


@pytest.fixture(params=range(3))
def experment_tag(request):
    return f"experiment-{request.param}"


@pytest.fixture(params=range(3))
def trace_tag(request):
    return f"metric-{request.param}"


def test_writer(experment_tag, trace_tag):
    writer = SummaryWriter('http://api:5000', experment_tag)
    writer.update_config({
        'model': 'ResNet',
        'train_config': {
            'lr': 0.01
        },
        'tta': [
            'hflip'
        ]
    })
    for i in range(10):
        writer.add_scalar(trace_tag, random.uniform(-1.0, 1.0), i)
