#!/usr/bin/env python
# -*- coding: utf-8 -*-
from cytoolz.curried import pipe, map, take, first, concat
from . import models as ms
from . import query as qry
from .session import DBSession
from cytoolz.curried import pipe, map, take
from flask_restful import Resource
from flask import jsonify
from flask import request


class ReadyAPI(Resource):

    def post(self):
        return True

    def put(self):
        return True

    def delete(self):
        return True

    def get(self):
        return True

    def patch(self):
        return True


class BaseAPI(Resource):

    def _post(self):
        raise NotImplementedError("Subclasses should implement this!")

    def _put(self):
        raise NotImplementedError("Subclasses should implement this!")

    def _delete(self):
        raise NotImplementedError("Subclasses should implement this!")

    def _get(self):
        raise NotImplementedError("Subclasses should implement this!")

    def _patch(self):
        raise NotImplementedError("Subclasses should implement this!")

    def post(self):
        return jsonify(self._post(**request.json))

    def put(self):
        return jsonify(self._put(**request.json))

    def delete(self):
        return jsonify(self._put(**request.json))

    def get(self):
        return jsonify(self._put(**request.json))

    def patch(self):
        return jsonify(self._put(**request.json))


class QueryAPI(BaseAPI):
    @staticmethod
    def _post(target,
              methods,
              entities=[]):
        with DBSession() as sess:
            query_class = eval(f"qry.{target}")
            q = query_class(
                entities=pipe(
                    entities,
                    map(lambda x: eval(f'ms.{x}')),
                    list
                ),
                session=sess,
            )
            for m in methods:
                q = getattr(q, m['name'])(*m['args'], **m['kwargs'])
            return q

    @staticmethod
    def _put(target, method):
        with DBSession() as sess:
            query_cls = eval(f"qry.{target}")
            model_cls = eval(f'ms.{target}')
            obj = model_cls().from_dict(method['kwargs']['obj'])
            return getattr(query_cls(session=sess), method['name'])(obj)
