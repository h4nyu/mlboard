import typing as t
import requests
from uuid import UUID
from urllib.parse import urljoin
from datetime import datetime


class Writer:

    def __init__(self, url: str) -> None:
        self.url = url
        self._tag_map: t.Dict[str, UUID] = {}

    def register_trace(self, tag: str) -> UUID:
        if tag in self._tag_map:
            return self._tag_map[tag]
        res = requests.post(
            urljoin(self.url, 'trace'),
            json={
                "tag": tag,
            }
        )
        return res.json()

    def add_scaler(self, tag: str, value: float) -> int:
        trace_id = self.register_trace(tag)
        res = requests.post(
            urljoin(self.url, 'trace/add-scalar'),
            json={
                "trace_id": trace_id,
                "value": value,
                "ts": str(datetime.now()),
            }
        )
        return res.json()
