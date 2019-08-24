FROM node:12-slim AS dev

MAINTAINER Xinyaun Yao <yao.ntno@gmail.com>

WORKDIR /srv
COPY ./package.json /srv/package.json
COPY ./yarn.lock /srv/yarn.lock
RUN yarn install  --proxy=$http_proxy
COPY ./  /srv
RUN mkdir -p /public
RUN mkdir -p /srv/dist
ENV NODE_ENV production
RUN npm run build

FROM busybox AS prod
COPY --from=dev /srv/dist /srv/dist
CMD cp -r /srv/dist/* /public && tail -f /dev/null
