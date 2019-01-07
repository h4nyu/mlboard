import mlboard_api.models as ms
import mlboard_api.query as qry
from mlboard_api.session import DBSession
import uuid

info_id = f'{uuid.uuid4()}'


def setup():
    expriment = ms.Experiment(
        id=info_id,
        tag=f'{uuid.uuid4()}',
    )
    trace = ms.Trace(
        x=1,
        y=1,
        tag=f'{uuid.uuid4()}',
        experiment_id=info_id
    )
    with DBSession() as sess:
        sess.merge(expriment)
        sess.merge(trace)
        sess.commit()


def test_delete_cascade():
    with DBSession() as sess:
        experiment = qry.Experiment(session=sess).get(info_id)
        assert experiment is not None
        traces = (qry.Trace(session=sess)
                  .filter(ms.Trace.experiment_id == info_id)
                  .all())
        assert len(traces) == 1

        qry.Experiment(session=sess).delete_cascade(info_id)

        experiment = qry.Experiment(session=sess).get(info_id)
        assert experiment is None
        traces = (qry.Trace(session=sess)
                  .filter(ms.Trace.experiment_id == info_id)
                  .all())
        assert len(traces) == 0
