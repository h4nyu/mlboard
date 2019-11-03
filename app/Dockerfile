FROM python:3.8-alpine AS prod

RUN apk add --no-cache gcc libc-dev make

ENV DOCKERIZE_VERSION v0.6.1
ENV PYTHONPYCACHEPREFIX /tmp/pycache
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

WORKDIR /srv
COPY ./ /srv
RUN pip install -e .[dev]
ENTRYPOINT ["dockerize", "-wait", "tcp://db:5432", "-timeout", "30s"]
