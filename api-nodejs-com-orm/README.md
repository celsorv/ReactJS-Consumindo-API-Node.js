# API usando Node.js e TypeORM
![Tela capturada](/screen_capture.jpg)
&nbsp;
&nbsp;
## ||| Instalações e configurações iniciais
>### Crie as pastas do projeto e o package.json inicial
```js
> md api-nodejs-com-orm     // cria a pasta base
> cd api-nodejs-com-orm     // e entra nela

> md src                    // cria a pasta src
> md dist                   // cria a pasta dist

// dentro da pasta src
> md src\@types             // cria a pasta @types 
> md src\database           // cria a pasta database
> md src\entities           // cria a pasta entities

// cria o arquivo 'index.ts' dentro da pasta 'src'
> echo console.log('Hello World') > src\index.ts

> npm init -y               // cria o package.json
```
&nbsp;
>### Crie um arquivo index.js na raiz do projeto
&nbsp;
>### Instale o Typescript
```js
> npm i typescript
> npx tsc --init            // inicia o Typescript
```
&nbsp;
>### instalar a tipagem do Node.js
>#### _(types se devem ao uso do Typescript no projeto)_
```
> npm i @types/node -D
```
&nbsp;
>### Instale a biblioteca Express
```js
> npm i express
```
&nbsp;
>### Instale as tipagens (Typescript) do Express
```js
> npm i @types/express -D   // -D: tipagem é só em ambiente 'dev'
```
&nbsp;
>### instalar pacote de constantes de status code
```
> npm i http-status-codes
```
&nbsp;
>### Instale o TS-NODE-DEV (transpilação e autoreload)
```js
> npm i ts-node-dev -D      // -D dependência de desenvolvimento
```
&nbsp;
>### Edite as configurações do Typescript (arquivo tsconfig.json)
>#### _(basta copiar o arquivo disponível aqui neste repositório)_
```js
{ 
    // others lines

    "strict": false,       /* colocado em false pois o Typescript já cuida disso */

    // others lines
} 
```
&nbsp;
>### Edite o arquivo package.json e insira a opção "dev" como script
```js
{
    "scripts": {
        // other lines
    
        "dev": "ts-node-dev --respawn --transpile-only --ignore-watch node_modules --no-notify src/index.ts",
        
        // other lines
    }
}
```
&nbsp;
## ||| Habilitando TypeORM e SQLite no projeto
### _Acesse [https://typeorm.io](https://typeorm.io/) para ver a documentação_
&nbsp;
>### Instale o TypeORM e Reflect-metadata
```js
> npm i typeorm reflect-metadata
```
&nbsp;
>### Instale a tipagem do TypeORM
```js
npm i @types/node -D
```
&nbsp;
>### Instale o driver do banco de dados, neste projeto, o SQLite
```js
> npm i sqlite3
```
&nbsp;
>### No arquivo _tsconfig.json_, certifique-se de que haja estas linhas _(conforme diz na documentação)_
```js
{
    // other lines

    "experimentalDecorators": true,
    "emitDecoratorMetadata": true

    // other lines
}
```
&nbsp;
>### Na raiz do projeto crie o arquivo _ormconfig.json_
```js
{
   "type": "sqlite",
   "database": "./src/database/database.sqlite",
   "migrations": ["./src/database/migration/**/*.ts"],
   "entities": ["./src/entities/**"],
   "cli": {
       "migrationsDir": "./src/database/migration/",
       "entitiesDir": "./src/entities"
   }
}
```
&nbsp;
>### Edite o arquivo package.json e insira a opção "typeorm" como script
```js
{
    "scripts": {
        // other lines
    
        "typeorm": "ts-node-dev ./node_modules/typeorm/cli.js",
        
        // other lines
    }
}
```
&nbsp;
>### Na pasta database crie um arquivo _index.ts_
```js
import { Connection, createConnection, getConnection } from 'typeorm';

export default async(): Promise<Connection> => {
    const defaultOption = await getConnection();
    
    return createConnection(
        Object.assign(defaultOption)
    );
}
```
&nbsp;
>### No _index.ts_ da raiz do projeto, inclua as linhas
```js
import createConnection from './database';

// insira esta linha antes da linha que inicia o servidor
createConnection();

// const server = express()
// other lines
```
&nbsp;
>### Crie os arquivos migrations das tabelas do projeto
```js
> npx typeorm migration:create -n CreateMessages
```
&nbsp;
### Com o comando acima, será criado um arquivo _1642937932475-CreateMessages.ts_ na pasta _src/database/migration_.
### Inclua neste arquivo as instruções de criação e remoção da tabela Messages.
>### 
```js
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateMessages1642937932475 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        /*
            instruções que serão executadas quando esta migration
            for executada.
        */
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        /*
            instruções que serão executadas quando for executada
            uma reversão desta migration.
        */
    }

}
```
&nbsp;
>### Com a classe _CreateMessages1642937932475_ (acima) pronta, rode as migrations para criar o banco de dados
```js
> npm run typeorm migration:run
```
&nbsp;
### Dentro da pasta _src/entities_ crie as definições de cada entidade do projeto, como
### por exemplo, _Messages.ts_
>### 
```js
import { Column, Entity, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity("messages")
class Message {

    /* definições da entidade Message */
}

export default Message;
```
&nbsp;
### Para ativar o servidor/API basta executar o script 'dev'
```js
> npm run dev
```
