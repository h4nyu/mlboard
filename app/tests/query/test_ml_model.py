import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim
from torchvision import datasets, transforms
from osca.session import DBSession
import osca.models as ms
import osca.query as qry
import uuid
import os
import io


class Net(nn.Module):
    def __init__(self):
        super(Net, self).__init__()
        self.conv1 = nn.Conv2d(1, 10, kernel_size=5)
        self.conv2 = nn.Conv2d(10, 20, kernel_size=5)
        self.conv2_drop = nn.Dropout2d()
        self.fc1 = nn.Linear(320, 50)
        self.fc2 = nn.Linear(50, 10)

    def forward(self, x):
        x = F.relu(F.max_pool2d(self.conv1(x), 2))
        x = F.relu(F.max_pool2d(self.conv2_drop(self.conv2(x)), 2))
        x = x.view(-1, 320)
        x = F.relu(self.fc1(x))
        x = F.dropout(x, training=self.training)
        x = self.fc2(x)
        return F.log_softmax(x, dim=1)


def test_load_save_model():
    net = Net()
    model_id = str(uuid.uuid4())
    row = ms.MLModel()
    row.id = model_id
    row.set_model(net)
    row.train_recipe_id = uuid.uuid4().hex

    with DBSession() as sess:
        qry.MLModel(session=sess)\
            .upsert(row)

    with DBSession() as sess:
        queried = qry.MLModel(session=sess)\
            .get(model_id)
        net_ = queried.get_model()
    assert str(net_) == str(net)
