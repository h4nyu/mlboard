
# for development
## touch `.env` file at project root.

```
SUBNET=192.168.22.1/24
WEB_PORT=80
STORYBOOK_PORT=8080
DB_PORT=5432
```
## start for production
```
$ docker-compose -f docker-compose.prod.yml up -d
```

## start for development
```
$ docker-compose -d
```
