## Prepare Instalation
  ```bash
    npm install
  ```

## Init ORM

  ```bash
    npx sequelize-cli init
  ```

## ORM Generate model

  ```bash
    npx sequelize-cli model:generate --name User --attributes username:string,password:string,status:integer,role:string
  ```

## DB Migration

  ```bash
    npx sequelize-cli db:migrate
  ```

## Undoing Migration

  ```bash
    npx sequelize-cli db:migrate:undo
  ```