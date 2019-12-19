FROM golang:1

ARG RUNTIME_DEPS="inotify-tools gcc"
WORKDIR /srv
RUN apt-get update \
    && apt-get install -y ${RUNTIME_DEPS}
COPY . .
