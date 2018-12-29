FROM python:3.6.5-slim AS prod

MAINTAINER Xinyaun Yao <yao.xinyuan@canon.co.jp>

# machine learning base library

RUN apt-get update && apt-get install -y \
    gcc

WORKDIR /srv
COPY ./requirements.txt /srv/requirements.txt
COPY ./dev-requirements.txt /srv/dev-requirements.txt
RUN pip install -r requirements.txt --no-cache-dir  && \
    pip install -r dev-requirements.txt  --no-cache-dir
#
COPY ./ /srv
RUN python setup.py develop
ENV FLASK_APP onikuflow
ENV FLASK_CONFIG_FILE_PATH /srv/onikuflow.cfg
