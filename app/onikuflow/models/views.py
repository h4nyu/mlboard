#  !/usr/bin/env python
#  -*- coding: utf-8 -*-

from sqlalchemy import Column, Integer, Float, Text, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.mutable import MutableList
from .model_base import Base, SerializableMixIn


class Feature(SerializableMixIn, Base):
    __tablename__ = 'v_features'
    __table_args__ = {"schema": "osca_collect"}
    id = Column(UUID(as_uuid=True), primary_key=True)
    product_id = Column(Integer)
    info_id = Column(UUID(as_uuid=True))
    value = Column(Float)
    collect_date = Column(DateTime(timezone=True))

    def __repr__(self):
        return f"Feature(collect_date={self.collect_date}, value={self.value}, info_id={self.info_id})"
