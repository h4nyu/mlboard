FROM rust:1.41-slim AS dev


RUN apt-get update \
    && apt-get install -y inotify-tools pkg-config libssl-dev \
    && update-ca-certificates \
    && rustup component add rustfmt \
    && cargo install cargo-tarpaulin 

WORKDIR /srv
COPY . .
RUN cargo build 

CMD cargo run

FROM debian:buster-slim AS prod
COPY --from=dev /usr/local/cargo/bin/app /usr/local/bin/app
CMD ["app"]
