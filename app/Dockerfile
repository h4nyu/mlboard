FROM python:3.8-slim AS dev

ENV PYTHONPYCACHEPREFIX /pycache
ARG BUILD_DEPS="gcc libc-dev"

WORKDIR /srv
COPY ./ /srv
ENV PYTHONPATH=/dependencies/lib/python3.8/site-packages:/dev-dependencies/lib/python3.8/site-packages \
    PATH=/dependencies/bin:/dev-dependencies/bin:$PATH

RUN apt-get update \
    && apt-get install --no-install-recommends -y $BUILD_DEPS inotify-tools \
    && pip install --prefix=/dependencies --no-cache-dir -Ue . \
    && pip install --prefix=/dev-dependencies --no-cache-dir -Ue .[dev] \
    && apt-get purge $BUILD_DEPS -y \
    && apt-get autoremove -y


FROM python:3.8-slim AS prod
ENV PYTHONPATH=/dependencies/lib/python3.8/site-packages \
    PATH=/dependencies/bin:$PATH
COPY --from=dev /dependencies /dependencies
COPY ./ /srv
WORKDIR /srv
CMD sh start_api.sh
