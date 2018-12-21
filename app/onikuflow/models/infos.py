#  !/usr/bin/env python
#  -*- coding: utf-8 -*-
from sqlalchemy import (Column,
                        Integer,
                        DateTime,
                        text,
                        Text,
                        LargeBinary,
                        Float)
from sqlalchemy.types import JSON
from sqlalchemy.ext.mutable import MutableList
from sqlalchemy.dialects.postgresql import UUID, JSONB
from datetime import datetime
import io
import os
import uuid
from .model_base import SerializableMixIn, Base


class InfoMixin(object):
    id = Column(UUID(), primary_key=True,
                server_default=text("uuid_generate_v4()"))
    name = Column(Text, nullable=False)
    hash = Column(UUID(), nullable=False,
                  server_default=text("uuid_generate_v4()"))
    create_date = Column(
        DateTime(timezone=True),
        default=datetime.now
    )

    def __eq__(self, other):
        return (str(other.id) == str(self.id)) and (str(other.hash) == str(self.hash))


class Info(InfoMixin, SerializableMixIn, Base):
    __tablename__ = 'infos'
    __table_args__ = {"schema": "osca_collect"}

    def __repr__(self):
        return f"Info(id={self.id}, name={self.name}, create_date={self.create_date})"
