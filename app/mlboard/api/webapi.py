#!/usr/bin/env python
# -*- coding: utf-8 -*-
from toolz.curried import pipe, map, take, first, concat
from mlboard.orm import models as ms
from mlboard.orm import queries as qs
from toolz.curried import pipe, map, take
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
              method):
        with ms.db.atomic() as transaction:
            query_class = eval(f"qs.{target}")
            res = getattr(query_class(), method['name'])(
                *method['args'], **method['kwargs'])
            transaction.commit()
            return res

    @staticmethod
    def _put(target, method):
        with ms.db.atomic() as transaction:
            query_cls = eval(f"qs.{target}")
            model_cls = eval(f'ms.{target}')
            obj = model_cls().from_dict(method['kwargs']['obj'])
            res = getattr(query_cls(), method['name'])(obj)
            transaction.commit()
            return res
