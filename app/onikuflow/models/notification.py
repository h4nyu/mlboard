#  !/usr/bin/env python
#  -*- coding: utf-8 -*-

from sqlalchemy import (Column,
                        text,
                        Text,)
from sqlalchemy.dialects.postgresql import UUID
from .model_base import Base, SerializableMixIn


class User(SerializableMixIn, Base):
    __tablename__ = 'users'
    __table_args__ = {"schema": "osca_collect"}
    id = Column(UUID(as_uuid=True), primary_key=True,
                server_default=text('uuid_generate_v4()'))
    name = Column(Text)
    mail = Column(Text)
