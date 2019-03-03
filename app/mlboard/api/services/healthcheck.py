from flask import Blueprint
from flask import jsonify
from flask import request, send_file
from mlboard.orm import models as ms
from mlboard.orm import queries as qs
from logging import getLogger
import os
logger = getLogger("api")

healthcheck_bp = Blueprint('healthcheck_bp', __name__)


@healthcheck_bp.route('/', methods=["POST", "GET", "PUT", "DELETE"])
def heartbeat():
    return jsonify(True)
