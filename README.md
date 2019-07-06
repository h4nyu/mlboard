
# for development
## touch `.env` file at project root.

```
# example 
SUBNET=192.168.22.1/24
WEB_PORT=8080
STORYBOOK_PORT=8081
DB_PORT=8082
```
## start
```
$ docker-compose build
$ docker-compose run board npm i
$ docker-compose run api sh /test_data/restore_demo_data.sh
$ docker-compose up -d
```
