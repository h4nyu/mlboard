FROM python:3.6-slim

WORKDIR /srv
COPY ./requirements.txt /srv/requirements.txt
RUN pip install -r requirements.txt --no-cache-dir
COPY ./ /srv
CMD alembic upgrade head
