# Shotest Url Desafio Backend

## To Do

Objective
> Your assignment is to implement a URL shortening service using Node, Typescript, Typeorm and Docker.

***

## Como Rodar em Desenvolvimento

### Crie .env.development a partir do .env.development.example

### Rodar em Devenvolvimento

Steps to run this project:

1. Run `yarn` command
2. Setup database settings inside `.env.development` file
3. Run `docker exec -it mysql mysql -uroot -proot -e 'create database shortestdb_dev;'` to create database
4. Run `yarn dev` command

### Rodar em Devenvolvimento no Docker Compose

`docker-compose --env-file .env.development up -d`
<br>

`docker-compose --env-file .env.development down`

***

## Como Rodar em Produção

### Crie .env.production a partir do .env.production.example

### Rodar como Produção no Docker Compose

`docker-compose --file docker-compose-production.yaml --env-file .env.production up -d`
<br>

`docker-compose --file docker-compose-production.yaml --env-file .env.production down`

***

### Consultar Logs em Produção

`docker exec -it shortest-url-desafio_api_production_1 tail -f logs/accessLogStream.log`

***

### Teste as rotas com o arquivo api.http em cada diretório

Use a extensão [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client "REST Client") Visual Studio Code para testar arquivo .http

***

### Rota da Documentação

`/api-docs`

***

## Como Rodar em Teste

### Crie .env.test a partir do .env.test.example

### Rodar em Teste

Passos para rodar esse projeto:

1. Rode o comando `yarn`
2. Configure o database pelo arquivo `.env.test`
3. Rode `docker exec -it mysql mysql -uroot -proot -e 'create database shortestdb_test;'` para criar o database
4. Rode o comando `yarn test`
5. Ou pode rodar o comando `yarn test:watch` para o modo monitoramento
