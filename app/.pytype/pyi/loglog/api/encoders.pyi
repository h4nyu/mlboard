# (generated with --quick)

import flask.app
import flask.json
from typing import Any, Type

Flask: Type[flask.app.Flask]
JSONEncoder: Type[flask.json.JSONEncoder]
datetime: Type[datetime.datetime]

class StrictEncoder(flask.json.JSONEncoder):
    def __init__(self, *args, **kwargs) -> None: ...
    def default(self, obj) -> Any: ...

def jsonify(*args, **kwargs) -> Any: ...
