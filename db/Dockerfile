FROM timescale/timescaledb:latest-pg11

ENV POSTGRES_USER mlboard
ENV POSTGRES_PASSWORD mlboard
ENV POSTGRES_DB mlboard

WORKDIR /srv

RUN apk update \
    && apk add --no-cache python3 python3-dev curl gcc libc-dev \
    && curl -k https://bootstrap.pypa.io/get-pip.py -o get-pip.py \
    && python3 get-pip.py \
    && rm get-pip.py \
    && pip install --no-cache-dir alembic psycopg2-binary \
    && apk del --purge gcc python3-dev libc-dev curl

COPY ./postgresql.conf /etc/postgresql.conf
COPY ./upgrade.sh /docker-entrypoint-initdb.d/upgrade.sh
COPY . .
RUN chmod o+r /etc/postgresql.conf

CMD ["postgres", "-c", "config_file=/etc/postgresql.conf"]
