import osca.models as ms
import osca.query as qry
from osca.session import DBSession
import pandas as pd
import uuid
from cytoolz.curried import pipe, map, take, filter
from pprint import pprint


def test_process_delet_cascade():
    info_id = str(uuid.uuid4())

    proceses = pipe(
        pd.date_range(start='1/1/2018', end='1/08/2018', tz="Asia/Tokyo"),
        map(lambda x: ms.Process(
            id=str(uuid.uuid4()),
            start_date=x,
            end_date=x,
            info_id=info_id
        )),
        list
    )
    row_len = len(proceses)
    with DBSession() as sess:
        qry.Process(session=sess).bulk_insert(proceses)
        queried = qry.Process(session=sess).filter_by(
            info_id=info_id).all()
        assert len(queried) == row_len

    with DBSession() as sess:
        qry.Process(session=sess).delete_cascade(info_id)
        queried = qry.Process(session=sess).filter_by(
            info_id=info_id).all()
        assert len(queried) == 0
