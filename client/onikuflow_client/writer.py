from requests.compat import urljoin
from datetime import datetime
import queue
from .api import Api


class SummaryWriter(object):
    def __init__(self, host_url, experiment_tag, buffer_size=5):
        self.host_url = host_url
        api_url = urljoin(host_url, "query")
        self.api = Api(api_url)
        self.experiment_tag = experiment_tag
        self._upsert_experiment()
        self.buffer_size = buffer_size
        self._trace_buffer = []
        assert self.experment is not None

    def _upsert_experiment(self):
        experment = (
            self.api
            .query("Experiment")
            .filter_by(tag=self.experiment_tag)
            .first()
        )
        if experment is None:
            experment = {
                'tag': self.experiment_tag
            }

        self.experment = self.api.upsert("Experiment", experment)
        print(self.experment)

    def update_config(self, config):
        self.experment["config"] = {
            **self.experment["config"],
            **config,
        }
        self.api.upsert("Experiment", self.experment)

    def add_scalar(self, tag, scalar_value, global_step=None, walltime=None):
        trace = {
            'tag': tag,
            'experiment_id': self.experment['id'],
            'x': global_step,
            'y': scalar_value,
            'ts': walltime if isinstance(walltime, datetime) else datetime.now(),
        }
        self._trace_buffer.append(trace)
        if len(self._trace_buffer) > self.buffer_size:
            self._insert()

    def _insert(self):
        self.api.query("Trace").bulk_insert(self._trace_buffer)
        self._trace_buffer = []

    def __del__(self):
        if len(self._trace_buffer) > 0:
            self._insert()
