FROM node:10-slim AS dev

RUN apt-get update && apt-get install -y \
    git

WORKDIR /srv
COPY ./package.json /srv/package.json
COPY ./package-lock.json /srv/package-lock.json
RUN npm install  --proxy=$http_proxy

COPY ./  /srv
RUN mkdir -p /public
RUN mkdir -p /srv/dist
ENV NODE_ENV production

FROM busybox AS prod
COPY --from=dev /srv/dist /srv/dist
CMD cp -r /srv/dist/* /public
