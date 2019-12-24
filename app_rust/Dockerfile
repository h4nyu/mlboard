FROM rust:latest

WORKDIR /srv
COPY . .
COPY ./cacert.crt /usr/local/share/ca-certificates

ARG RUNTIME_DEPS="inotify-tools"
RUN apt-get update \
    && apt-get install -y ${RUNTIME_DEPS} \
    && update-ca-certificates \
    && cargo fetch
