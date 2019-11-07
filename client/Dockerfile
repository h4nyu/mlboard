FROM python:3.8-alpine AS prod

RUN apk add --no-cache gcc libc-dev make

WORKDIR /srv
COPY ./ /srv
RUN pip install -e .[dev]
