from mlboard.orm import queries as qs
from mlboard.orm import models as ms
import uuid
from faker import Faker
fake = Faker()


def setup():
    qs.Experiment().delete()


def test_upsert():
    experiment = ms.Experiment(
        id=uuid.uuid4(),
        name="foo",
    )
    qs.Experiment().upsert(experiment)
    queried = qs.Experiment().get_or_none(id=experiment.id)
    assert queried.id == experiment.id
