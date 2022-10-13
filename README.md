# ijunior-equipe3-projeto1
Projeto de capacitacao da iJunior. 
Spotify API

## Execução e scripts

Rode o projeto usando o comando `nodemon`.

* Se quiser atualizar as definições do swagger, rode `npm run doc` para re-escrever o arquivo json dele.
* Se desejar recriar as tabelas do zero, apague o arquivo do banco de dados e rode `npm run createTables`
* Se for rodar em windows, execute o comando `npm run bcrypt`, ele vai re-instalar o pacote de acordo com seu sistema atual

## Testes

Existem testes automatizados, que podem ser rodados com `npm run test`. Eles foram escritos com jest e supertest e representam alguns testes de integração da aplicação, fazendo requisições e verificando retornos

Você pode testar também usando a collection postman, que pode ser importada com o arquivo json dentro da pasta `/scripts`

## Decisões tecnicas

Optei por não fazer tudo dos testes, uma vez que é mais fácil verificar com o postman. Os testes deveriam ter um setup e tearDown globais, criando um banco de dados separado baseado no arquivo .env.test com dados falsos, fazer as requisições e destruir esse banco no final da execução. 
