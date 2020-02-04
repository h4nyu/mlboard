FROM python:3.7-alpine

WORKDIR /srv
COPY ./ /srv

ENV DOCKERIZE_VERSION v0.6.1
RUN apk update \
    && apk add --no-cache --virtual my-dependencies wget gcc postgresql-dev libc-dev \
    && apk add --no-cache postgresql-dev \
    && wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && pip install -r requirements.txt --no-cache-dir \
    && apk del my-dependencies

ENTRYPOINT ["dockerize", "-wait", "tcp://db:5432", "-timeout", "30s"]
CMD alembic upgrade head && tail -f /dev/null
