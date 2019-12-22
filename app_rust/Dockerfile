FROM rust:1-slim

WORKDIR /srv
COPY . .

ARG RUNTIME_DEPS="inotify-tools"
RUN apt-get update \
    && apt-get install -y ${RUNTIME_DEPS} \
    && cargo fetch
