#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
import datetime
import json
import uuid
from sqlalchemy import create_engine
from sqlalchemy.pool import NullPool
from sqlalchemy.orm import sessionmaker


class JSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime.datetime):
            return obj.isoformat()
        if isinstance(obj, uuid.UUID):
            return obj.hex
        if isinstance(obj, uuid.UUID):
            return obj.hex
        return super().default(obj)


def dumps(d):
    return json.dumps(d, cls=JSONEncoder)


SQL_ALCHEMY_CONN = os.getenv("SQL_ALCHEMY_CONN",
                             'postgresql://osca:osca@db:5432/osca')


class DBSession(object):
    """SQLAlchemy database session"""

    def __init__(self, connection_string=SQL_ALCHEMY_CONN, echo=False):
        self.session = None
        engine = create_engine(connection_string,
                               json_serializer=dumps,
                               echo=echo,
                               poolclass=NullPool)

        self.sessionmaker = sessionmaker(bind=engine, autoflush=False)

    def __enter__(self):
        self.session = self.sessionmaker()
        return self.session

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.session.close()
