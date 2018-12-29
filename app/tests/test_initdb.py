from onikuflow.initdb import initdb


def test_initdb():
    # alembic adds significant import time, so we import it lazily
    initdb()
