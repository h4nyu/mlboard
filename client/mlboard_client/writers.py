import typing as t
import requests
from uuid import UUID
from urllib.parse import urljoin
from datetime import datetime
from toolz.curried import keymap


class Writer:

    def __init__(
        self, url: str,
        workspace_name: str,
        params: t.Dict[str, t.Any]={},
    ) -> None:
        self.url = url
        self._trace_id_map: t.Dict[str, UUID] = {}
        self._workspace_id = self.register_workspace(
            name=workspace_name,
            params=params,
        )

    def register_workspace(self, name: str, params: t.Dict[str, t.Any]) -> UUID:
        res = requests.post(
            urljoin(self.url, 'workspace'),
            json={
                "name": name,
                "params": params,
            }
        )
        return res.json()

    def register_trace(self, name: str) -> UUID:
        if name in self._trace_id_map:
            return self._trace_id_map[name]
        res = requests.post(
            urljoin(self.url, 'trace'),
            json={
                "name": name,
                'workspace_id': self._workspace_id,
            }
        )
        self._trace_id_map[name] = res.json()
        return res.json()

    def add_scaler(self, name: str, value: float, ts:t.Optional[datetime]=None) -> int:
        trace_id = self.register_trace(name)
        res = requests.post(
            urljoin(self.url, 'point/add-scalar'),
            json={
                "trace_id": trace_id,
                "value": value,
                "ts": ts,
            }
        )
        return res.json()

    def add_scalers(self, values: t.Dict[str, float], ts:t.Optional[datetime]=None) -> int:
        _values = keymap(self.register_trace)(values)
        res = requests.post(
            urljoin(self.url, 'point/add-scalars'),
            json={
                "values": _values,
                "ts": ts,
            }
        )
        return res.json()
