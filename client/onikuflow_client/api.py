import requests
from datetime import datetime
import json


class DefaultEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        return JSONEncoder.default(self, obj)


class Api(object):
    def __init__(self, api_url):
        self.api_url = api_url
        self.payload = {}

    def _post(self):
        res = requests.post(
            self.api_url,
            data=json.dumps(self.payload, cls=DefaultEncoder),
            headers={'Content-Type': 'application/json'}
        )
        res.raise_for_status()
        return res.json()

    def _put(self):
        res = requests.put(self.api_url, json=self.payload)
        res.raise_for_status()
        return res.json()

    def query(self, target, entities=[]):
        self.payload = {
            'target': target,
            'entities': entities,
            "methods": [],
        }
        return self

    def get(self, id):
        self.payload['methods'].append(
            {
                'name': 'get',
                'args': [id],
                'kwargs': {}
            }
        )
        return self._post()

    def distinct(self, formula):
        self.payload['methods'].append(
            {
                'name': 'distinct',
                'args': [formula],
                'kwargs': {}
            }
        )
        return self

    def order_by(self, formula):
        self.payload['methods'].append(
            {
                'name': 'order_by',
                'args': [formula],
                'kwargs': {}
            }
        )
        return self

    def limit(self, num):
        self.payload['methods'].append(
            {
                'name': 'limit',
                'args': [num],
                'kwargs': {}
            }
        )
        return self

    def filter(self, formula):
        self.payload['methods'].append(
            {
                'name': 'filter',
                'args': [formula],
                'kwargs': {}
            }
        )
        return self

    def filter_by(self, **kwargs):
        self.payload['methods'].append(
            {
                'name': 'filter_by',
                'args': [],
                'kwargs': kwargs
            }
        )
        return self

    def count(self):
        self.payload['methods'].append(
            {
                "name": "count",
                "args": [],
                "kwargs": {}
            }
        )
        return self._post()

    def first(self):
        self.payload['methods'].append(
            {
                "name": "first",
                "args": [],
                "kwargs": {}
            }
        )
        return self._post()

    def bulk_insert(self, objs):
        self.payload['methods'].append(
            {
                "name": "bulk_insert",
                "args": [objs],
                "kwargs": {}
            }
        )
        return self._post()

    def all(self):
        self.payload['methods'].append(
            {
                "name": "all",
                "args": [],
                "kwargs": {}
            }
        )
        return self._post()

    def upsert(self, target, obj):
        self.payload = {
            'target': target,
            'method': {
                "name": "upsert",
                "args": [],
                "kwargs": {'obj': obj}
            }
        }
        return self._put()

