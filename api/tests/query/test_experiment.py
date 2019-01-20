import mlboard_api.models as ms
import mlboard_api.queries as qs
import uuid


def test_filter_by():
    info_id = uuid.uuid4()
    experiment = ms.Experiment.create(
        id=info_id,
        tag=f'{uuid.uuid4()}',
    )
    experiment.save()
    rows = qs.Experiment().filter_by(id=info_id).all()
    assert len(rows) == 1


def test_first():
    info_id = uuid.uuid4()
    experiment = ms.Experiment.create(
        id=info_id,
        tag=uuid.uuid4(),
    )
    experiment.save()
    row = qs.Experiment().filter_by(id=info_id).first()
    assert row.id == info_id


def test_query():
    info_id = uuid.uuid4()
    experiment = ms.Experiment.create(
        id=info_id,
        tag=uuid.uuid4(),
    )
    experiment.save()
    row = qs.Experiment(ms.Experiment.id).filter_by(id=info_id).first()
    assert row.id == info_id
    assert row.create_date is None


def test_delete():
    info_id = uuid.uuid4()
    experiment = ms.Experiment.create(
        id=info_id,
        tag=uuid.uuid4(),
    )
    experiment.save()
    row_count = qs.Experiment().filter_by(id=info_id).delete()
    assert row_count == 1


def test_delete_cascade():
    info_id = uuid.uuid4()
    experiment = ms.Experiment.create(
        id=info_id,
        tag=uuid.uuid4(),
    )
    rows = qs.Experiment().filter_by(id=info_id).all()
    assert len(rows) == 1

    trace = ms.Trace.create(
        id=uuid.uuid4(),
        tag='test',
        experiment_id=info_id,
    )
    trace.save()

    traces = qs.Trace().filter_by(experiment_id=info_id).all()

    assert len(traces) == 1

    deleted_id = qs.Experiment().delete_cascade(info_id)
    assert deleted_id == info_id

    rows = qs.Experiment().filter_by(id=info_id).all()
    assert len(rows) == 0
    traces = qs.Trace().filter_by(experiment_id=info_id).all()
    assert len(traces) == 0
