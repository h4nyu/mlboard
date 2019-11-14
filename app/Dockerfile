FROM python:3.8-alpine

ENV PYTHONPYCACHEPREFIX /pycache

WORKDIR /srv
COPY ./ /srv
RUN apk update \
    && apk add --no-cache gcc libc-dev make inotify-tools \
    && pip install --no-cache-dir -e .[dev] \
    && apk del gcc libc-dev make

CMD sh start_api.sh
