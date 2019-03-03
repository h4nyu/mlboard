from flask import Blueprint
from flask import jsonify
from flask import request, send_file
from mlboard.orm import models as ms
from mlboard.orm import queries as qs
from logging import getLogger
import os
logger = getLogger("api")

experiment_bp = Blueprint('experiment_bp', __name__)


@experiment_bp.route('/experiment/all', methods=["POST"])
def all():
    res = qs.Experiment().all()
    return jsonify(res)
