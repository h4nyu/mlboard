FROM python:3.7-slim as prod

RUN apt-get update \
    && apt-get install -y \
    unzip \
    gcc \
    && apt-get clean \
    && rm -rf /var/cache/apt/archives/* /var/lib/apt/lists/*

RUN pip install pipenv

COPY ./ /srv
WORKDIR /srv
RUN pipenv install --dev
RUN pipenv install -e .
