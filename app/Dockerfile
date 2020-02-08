FROM rust:1.41-slim AS dev

WORKDIR /srv
COPY . .
COPY ./cacert.crt /usr/local/share/ca-certificates

ARG RUNTIME_DEPS="inotify-tools"
RUN apt-get update \
    && apt-get install -y ${RUNTIME_DEPS} \
    && update-ca-certificates \
    && cargo build --all --tests \
    && cargo install --path . 
CMD cargo run

FROM debian:buster-slim AS prod
COPY --from=dev /usr/local/cargo/bin/app /usr/local/bin/app
CMD ["app"]
