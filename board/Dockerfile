FROM node:13-slim AS dev

WORKDIR /
COPY package.json *yarn* /
RUN yarn install
ENV PATH /node_modules/.bin:$PATH

WORKDIR /srv
COPY ./  /srv
ENV NODE_ENV development
RUN yarn run build

FROM busybox AS prod
COPY --from=dev /srv/dist /srv/dist
CMD cp -r /srv/dist/* /public

