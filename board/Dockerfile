FROM node:13-alpine AS dev

WORKDIR /
ENV PATH /node_modules/.bin:$PATH
COPY package.json *yarn* /
RUN yarn install

WORKDIR /srv
COPY ./  /srv
ENV NODE_ENV development
RUN yarn run build

FROM busybox AS prod
COPY --from=dev /srv/dist /srv/dist
CMD cp -r /srv/dist/* /public && tail -f /dev/null
