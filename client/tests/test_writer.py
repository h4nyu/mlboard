import pytest
from onikuflow_client.writer import SummaryWriter


@pytest.fixture(params=[0, 1])
def writer(request):
    tag = f"test-{request.param}"
    return SummaryWriter('http://api:5000', tag)


def test_writer(writer):
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
        writer.add_scalar('test', 1, i)
