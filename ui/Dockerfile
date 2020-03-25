FROM node:13-slim AS dev

WORKDIR /srv
COPY package.json  /srv/package.json
COPY yarn.lock /srv/yarn.lock
RUN yarn install

ENV NODE_ENV development
COPY ./  /srv
RUN yarn run build

FROM busybox AS prod
COPY --from=dev /srv/dist /srv/dist
CMD cp -r /srv/dist/* /public && tail -f /dev/null
