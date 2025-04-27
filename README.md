<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

 # ejecutar en desarrollo
 1. Tener nest CLI instalado
 ```
 npm i -g @nestjs/cli
 ```
  2. Clonar el repositorio
  
  3. Instalar dependencias
  ```
  yarn install
  ```
 4. Crear un archivo .env
  ```
    cp .env.example .env
  ``` 
  5. Crear la base de datos
  ```
    docker-compose up -d
  ```
  

  ## Stack usado
  - Nest
  - mongoDB