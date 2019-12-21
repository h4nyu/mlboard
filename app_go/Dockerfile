FROM golang:1

ARG RUNTIME_DEPS="inotify-tools gcc"
WORKDIR /srv
COPY . .
RUN apt-get update \
    && apt-get install -y ${RUNTIME_DEPS} \
    && go mod download
