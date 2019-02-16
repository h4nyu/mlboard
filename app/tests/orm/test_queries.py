from mlboard.orm import queries as qs
from mlboard.orm import models as ms
from faker import Faker


def setup():
    qs.Experiment().delete()


def test_experiment_get_or_none():
    fake = Faker()
    experiment = ms.Experiment()
    experiment.tag = fake.name()
    experiment.memo = fake.name()
    qs.Experiment().upsert(experiment)

    queried = qs.Experiment().get_or_none(
        tag=experiment.tag,
        memo=experiment.memo
    )
    assert queried.tag == experiment.tag
    assert queried.memo == experiment.memo

    queried = qs.Experiment().get_or_none(
        tag=f"{experiment.tag}--",
    )
    assert queried is None


def test_experiment_filter_by():
    fake = Faker()
    experiment = ms.Experiment()
    experiment.tag = fake.name()
    experiment.memo = fake.name()
    qs.Experiment().upsert(experiment)

    queried = qs.Experiment().filter_by(
        tag=experiment.tag,
        memo=experiment.memo
    )
    assert len(queried) == 1

    queried = qs.Experiment().filter_by(
        tag=f"{experiment.tag}--",
    )
    assert len(queried) == 0
