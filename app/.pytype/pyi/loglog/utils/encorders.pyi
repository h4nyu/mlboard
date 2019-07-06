# (generated with --quick)

import flask.app
import flask.json
from typing import Any, Type

Flask: Type[flask.app.Flask]
JSONEncoder: Type[flask.json.JSONEncoder]
SerializableMixIn: Any
datetime: Type[datetime.datetime]

class DefaultEncoder(flask.json.JSONEncoder):
    def default(self, obj) -> Any: ...

def jsonify(*args, **kwargs) -> Any: ...
