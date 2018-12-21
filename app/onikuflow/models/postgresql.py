#!/usr/bin/env python
# -*- coding: utf-8 -*-
from .model_base import Base, SerializableMixIn
from sqlalchemy import (Column,
                        Text,
                        Float,)


class Table(Base, SerializableMixIn):
    __tablename__ = 'tables'
    __table_args__ = {"schema": "information_schema"}
    table_schema = Column(Text, primary_key=True)
    table_name = Column(Text, primary_key=True)

    def __repr__(self):
        return f"Table(pid={self.pid}, table_schema={self.table_schema}, table_name={self.table_name})"
