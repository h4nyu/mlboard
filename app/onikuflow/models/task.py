#!/usr/bin/env python
# -*- coding: utf-8 -*-
from .model_base import Base, SerializableMixIn
from sqlalchemy import (Column,
                        DateTime,
                        text,
                        JSON,
                        Text,
                        Float,)
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.ext.hybrid import hybrid_property
from datetime import timedelta, datetime


class Target(Base, SerializableMixIn):
    __tablename__ = 'targets'
    __table_args__ = {"schema": "osca_collect"}
    id = Column(UUID(as_uuid=True), primary_key=True,
                server_default=text('uuid_generate_v4()'))
    name = Column(Text)
    content = Column(JSON)
    create_date = Column(DateTime(timezone=True), default=datetime.now)

    def __repr__(self):
        return f"Target(name={self.name}, create_Date={self.create_date})"


class RangeTarget(Base, SerializableMixIn):
    __tablename__ = 'range_targets'
    __table_args__ = {"schema": "osca_collect"}
    id = Column(UUID(as_uuid=True), primary_key=True)
    name = Column(Text)
    param_id = Column(UUID(as_uuid=True))
    param_date = Column(DateTime(timezone=True))

    def __repr__(self):
        return f"RangeTarget(name={self.name}, last_date={self.param_date}, param_id={self.param_id})"
