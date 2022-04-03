# Shotest Url Desafio Backend

## To Do

Objective
> Your assignment is to implement a URL shortening service using Node and any framework.

## Como Rodar

### Crie .env.development by .env.development.example

### Rodar como Devenvolvimento

Steps to run this project:

1. Run `yarn` command
2. Setup database settings inside `.env.development` file
3. Run `docker exec -it mysql mysql -uroot -proot -e 'create database shortestdb;'` to create database
4. Run `yarn dev` command

### Teste as rotas com o arquivo api.http em cada diretório

Use a extensão [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client "REST Client") Visual Studio Code para testar arquivo .http

### Rota da Documentação

`/api-docs`
