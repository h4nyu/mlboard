FROM nginx:stable

RUN apt-get update && apt-get install -y \
    wget

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

COPY ./nginx.prod.conf /etc/nginx/nginx.conf    
WORKDIR /srv

ENTRYPOINT ["dockerize", "-wait", "tcp://api:5000", "-timeout", "30s"]
CMD ["nginx", "-g", "daemon off;"]
