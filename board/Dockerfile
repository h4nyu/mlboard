FROM node:13-alpine AS dev

WORKDIR /srv
COPY ./  /srv
ENV PATH /node_modules/.bin:$PATH
ENV NODE_ENV development
RUN yarn install \
    && yarn build

FROM busybox AS prod
COPY --from=dev /srv/dist /srv/dist
CMD cp -r /srv/dist/* /public && tail -f /dev/null
