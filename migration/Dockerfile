FROM python:3.8-slim-buster


WORKDIR /srv
COPY ./ /srv
ENV DOCKERIZE_VERSION v0.6.1
RUN apt-get update -y \
    && apt-get install --no-install-recommends wait-for-it \
    && pip install -r requirements.txt --no-cache-dir
ENTRYPOINT ["wait-for-it", "db:5432", "--"]
CMD alembic upgrade head && tail -f /dev/null
