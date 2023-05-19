# <p align="center">Express JS Template</p>
### Technologies used:
* TypeScript
* Express JS
* TypeORM
* PostgreSQL
* SQLite
* Docker and docker compose
## Navigate
* [Getting started](#getting-started)
    * [Start typescript/dev app](#start-typescriptdev-app)
    * [Build app](#build-app)
    * [Start javascript app](#start-javascript-app)
* [Docker](#docker)
    * [Сontainer lifting](#сontainer-lifting)
    * [Logs](#logs)
    * [Manage database container](#manage-database-container)
    * [Custom network name](#custom-network-name)
* [Environment variables config](#environment-variables-config)
## Getting started
### Start typescript/dev app
```bash
$ git clone https://github.com/webshining/expressjs.template project_name
$ cd project_name
$ cp .env.ren .env
$ npm install
$ npm run start:dev
```
### Build app
```bash
$ npm run build
```
### Start javascript app
```bash
$ npm run start
```
## Docker
### Сontainer lifting
> Build required (`npm run build`)
```bash
$ docker-compose up -d
```
### Logs
```bash
$ docker-compose logs app
$ docker-compose logs db
```
### Manage database container
>You can change default database(default - postgres), username(default - postgres) and password(default - postgres) in `docker-compose.yml`
```bash
$ docker-compose exec db bash
# in container
$ psql -U postgres
```
### Custom network name
>Сreate a network (`network_name: changeable`(your custom network name))
```bash
$ docker network create network_name
```
>Paste at the end of the docker-compose.yml file
```
networks:
    default:
        name: network_name
        external: true
```
## Environment variables config
`PORT` - The port on which the server will run

`DB_NAME` - Database name(default: database)

`DB_USER` - Database username(required for PostgreSQL)

`DB_PASS` - Database password(required for PostgreSQL)

`DB_HOST` - Database host(required for PostgreSQL)

`DB_PORT` - Database port(required for PostgreSQL)

`LOGGING` - Enable/Disable database logging 
