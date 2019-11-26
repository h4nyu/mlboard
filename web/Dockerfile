FROM nginx:alpine


ENV DOCKERIZE_VERSION v0.6.1
RUN apk update \
    && apk add --no-cache --virtual my-dependencies wget \
    && wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && apk del my-dependencies

COPY ./nginx.prod.conf /etc/nginx/nginx.conf    
WORKDIR /srv

ENTRYPOINT ["dockerize", "-wait", "tcp://api:5000", "-timeout", "30s"]
CMD ["nginx", "-g", "daemon off;"]
