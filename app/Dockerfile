FROM rust:1.40-slim

WORKDIR /srv
COPY . .
COPY ./cacert.crt /usr/local/share/ca-certificates

ARG RUNTIME_DEPS="inotify-tools"
RUN apt-get update \
    && apt-get install -y ${RUNTIME_DEPS} \
    && update-ca-certificates \
    && rustup component add rustfmt \
    && cargo fetch \
    && cargo build
