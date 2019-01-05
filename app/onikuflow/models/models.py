#!/usr/bin/env python
# -*- coding: utf-8 -*-
from sqlalchemy import (
    Column,
    Integer,
    DateTime,
    text,
    Text,
    LargeBinary,
    Float
)
import datetime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.types import JSON
from sqlalchemy.orm.collections import InstrumentedList
from sqlalchemy.ext.declarative import declarative_base
import uuid
from .mixins import SerializableMixIn

Base = declarative_base()


class Trace(SerializableMixIn, Base):
    __tablename__ = 'traces'
    id = Column(UUID, primary_key=True)
    x = Column(Float)
    y = Column(Float)
    ts = Column(DateTime(timezone=True), default=datetime.datetime.now)
    tag = Column(Text, nullable=False)
    experiment_id = Column(UUID(), nullable=False)

    def __repr__(self):
        return f"Timeseries(x={self.x}, y={self.y}, tag={self.tag})"


class Experiment(SerializableMixIn, Base):
    __tablename__ = 'experiments'
    id = Column(
        UUID,
        primary_key=True,
        server_default=text("uuid_generate_v4()")
    )
    tag = Column(Text, nullable=False)
    memo = Column(Text, nullable=False)
    config = Column(JSON)
    create_date = Column(DateTime(timezone=True), default=datetime.datetime.now)
    hash = Column(
        UUID,
        nullable=False,
        server_default=text("uuid_generate_v4()")
    )

    def __repr__(self):
        return f"Experiment(name={self.tag})"
