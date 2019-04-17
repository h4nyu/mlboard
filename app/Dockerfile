FROM python:3.6-slim AS prod

RUN apt-get update \
    && apt-get install -y \
    unzip \
    gcc \
    && apt-get clean \
    && rm -rf /var/cache/apt/archives/* /var/lib/apt/lists/*

WORKDIR /srv
COPY ./requirements.txt /srv/requirements.txt
COPY ./dev-requirements.txt /srv/dev-requirements.txt
RUN pip install -r requirements.txt --no-cache-dir  && \
    pip install -r dev-requirements.txt  --no-cache-dir

COPY ./ /srv
ENV MYPYPATH /srv/stubs
RUN python setup.py develop
