FROM postgres:11
ENV POSTGRES_USER onikuflow
ENV POSTGRES_PASSWORD onikuflow
ENV POSTGRES_DB onikuflow
COPY ./postgresql.conf /etc/postgresql.conf
RUN chmod o+r /etc/postgresql.conf
WORKDIR /srv
CMD ["postgres", "-c", "config_file=/etc/postgresql.conf"]
