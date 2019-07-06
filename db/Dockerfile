FROM timescale/timescaledb:latest-pg11

ENV POSTGRES_USER mlboard
ENV POSTGRES_PASSWORD mlboard
ENV POSTGRES_DB mlboard

COPY ./postgresql.conf /etc/postgresql.conf
RUN chmod o+r /etc/postgresql.conf
WORKDIR /srv
CMD ["postgres", "-c", "config_file=/etc/postgresql.conf"]
