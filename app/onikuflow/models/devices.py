#!/usr/bin/env python
# -*- coding: utf-8 -*-
from sqlalchemy import text
from sqlalchemy import Column, Integer,  DateTime, Text, Boolean
from sqlalchemy import UniqueConstraint
from .model_base import Base
from .model_base import SerializableMixIn


class Unit(SerializableMixIn, Base):
    __tablename__ = "mst_unit"
    __table_args__ = {"schema": "osca_collect"}
    id = Column("unit_id", Integer, primary_key=True)
    name = Column("display_name", Text)
    ip_address = Column("ip_address_name", Text)
    del_flg = Column(Boolean)
    create_date = Column(DateTime(timezone=False),
                         nullable=False,
                         server_default=text('clock_timestamp()'))
    plc_device_number_a = Column(Integer, server_default='7000')
    plc_device_number_b = Column(Integer, server_default='9000')


class ComDevice(SerializableMixIn, Base):
    __tablename__ = "com_device"
    __table_args__ = {"schema": "osca_collect"}
    id = Column(Integer, primary_key=True)
    col_num = Column(Integer, nullable=False)
    type = Column(Integer, nullable=False)
    name = Column(Text)
    tag = Column(Text)

    unit_id = Column(Integer, nullable=False)


class PlcDevice(SerializableMixIn,  Base):
    __tablename__ = "plc_device"
    __table_args__ = {"schema": "osca_collect"}
    id = Column(Integer, primary_key=True)
    num = Column(Integer,
                 nullable=False)

    type = Column(Integer,
                  nullable=False)

    name = Column(Text)

    unit_id = Column(Integer, nullable=False)

    create_date = Column(DateTime(timezone=False),
                         nullable=False,
                         server_default=text('clock_timestamp()'))
