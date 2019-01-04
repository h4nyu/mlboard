from requests.compat import urljoin
from .api import Api


class SummaryWriter(object):
    def __init__(self, host_url, experiment_tag):
        self.host_url = host_url
        api_url = urljoin(host_url, "query")
        self.api = Api(api_url)
        self.experiment_tag = experiment_tag
        self._upsert_experiment()
        self.experiment = None

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
            'ts': walltime,
        }
        self.api.upsert('Trace', trace)
