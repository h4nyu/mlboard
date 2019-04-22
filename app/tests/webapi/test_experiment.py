import pytest
from .fixtures import client
from mlboard.orm import models as ms
from unittest import mock

NAMESPACE = 'mlboard.webapi.services.experiment'


@mock.patch(f'{NAMESPACE}.qs.Experiment')
def test_all(mock_qury, client):
    dummy_item = ms.Experiment(
        name='foo',
    )
    mock_qury().all = mock.MagicMock(return_value=[dummy_item])
    res = client.get('/experiment/all')
    assert res.status_code == 200
    assert res.json()[0]['name'] == dummy_item.name
