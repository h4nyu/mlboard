#!/usr/bin/env python
# -*- coding: utf-8 -*-
from sqlalchemy import (
    Column,
    Integer,
    DateTime,
    text,
    Text,
    LargeBinary,
    SmallInteger
)
from sqlalchemy import ForeignKey
from sqlalchemy.dialects.postgresql import JSONB
from .model_base import Base
from .model_base import SerializableMixIn


class LogControlData(SerializableMixIn, Base):
    __tablename__ = 'log_control_data'
    __table_args__ = {"schema": "osca_collect"}
    log_sequence = Column(Integer, primary_key=True)
    begin_date = Column(DateTime(timezone=False), nullable=False)
    end_date = Column(DateTime(timezone=False), nullable=False)
    create_date = Column(DateTime(timezone=False),
                         server_default=text('clock_timestamp()'))
    binary_data = Column(LargeBinary)
    deficit_flg = Column(SmallInteger)
    unit_id = Column(Integer, ForeignKey('mst_unit.unit_id'))


class LogEventData(SerializableMixIn, Base):
    __tablename__ = 'log_event_data'
    __table_args__ = {"schema": "osca_collect"}
    log_sequence = Column(Integer, primary_key=True)
    collect_date = Column(DateTime(timezone=False), nullable=False)
    create_date = Column(DateTime(timezone=False),
                         server_default=text('clock_timestamp()'))
    binary_data = Column(JSONB)
    tag = Column(Text)
    unit_id = Column(Integer,
                     ForeignKey('mst_unit.unit_id'),
                     nullable=False)


class LogMeasurementData(SerializableMixIn, Base):
    __tablename__ = 'log_measurement_data'
    __table_args__ = {"schema": "osca_collect"}
    log_sequence = Column(Integer, primary_key=True)
    begin_date = Column(DateTime(timezone=False), nullable=False)
    end_date = Column(DateTime(timezone=False), nullable=False)
    binary_data = Column(LargeBinary)
    unit_id = Column(Integer, ForeignKey(
        'mst_unit.unit_id'), nullable=False)
    create_date = Column(DateTime(timezone=True),
                         server_default=text('clock_timestamp()'))
    deficit_flg = Column(SmallInteger)
