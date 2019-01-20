#!/usr/bin/env python
# -*- coding: utf-8 -*-
import datetime
import uuid
import json
import datetime
from peewee import Model, FloatField, TextField, ModelSelect
from playhouse.db_url import connect
from playhouse.postgres_ext import UUIDField, DateTimeTZField, JSONField
from playhouse.shortcuts import model_to_dict, update_model_from_dict
from .config import config


SQL_ALCHEMY_CONN = config['SQL_ALCHEMY_CONN']
db = connect(SQL_ALCHEMY_CONN)

__all__ = ["BaseModel", "Experiment", "Trace"]


class BaseModel(Model):
    class Meta:
        database = db

    def to_dict(self):
        return model_to_dict(self)

    def from_dict(self, data: dict):
        update_model_from_dict(self, data)
        return self

    def to_json(self, *args, **kwargs):
        return json.dumps(self.to_dict(*args, **kwargs))

    def from_json(self, json_str):
        self.from_dict(json.loads(json_str))
        return self

    def clone(self):
        dict_ = self.to_dict()
        return self.__class__().from_dict(dict_)


class Trace(BaseModel):
    class Meta:
        table_name = "traces"
    id = UUIDField(primary_key=True, default=uuid.uuid4)
    x = FloatField()
    y = FloatField()
    ts = DateTimeTZField(default=datetime.datetime.now)
    tag = TextField()
    experiment_id = UUIDField()


class Experiment(BaseModel):
    class Meta:
        table_name = "experiments"
    id = UUIDField(primary_key=True, default=uuid.uuid4)
    tag = TextField()
    memo = TextField()
    config = JSONField(default={})
    create_date = DateTimeTZField(default=datetime.datetime.now)
    hash = UUIDField(default=uuid.uuid4)
