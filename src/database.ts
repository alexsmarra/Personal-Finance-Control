// Knex é uma interface para configuração
import { knex as setupKnex, Knex } from 'knex'
import { env } from './env'

/* Dizendo para a const config para que ela siga as configurações de 
nossa interface Knex */
export const config: Knex.Config = {
  // banco de dados que estamos utilizando
  client: 'sqlite',
  /* informações obrigatórias sobre a nossa conexão, que no sqlite precisamos
  informar apenas o nome do arquivo */
  connection: {
    /* criar uma pasta 'tmp' antes, na raíz de nosso código, esse código
    ira criar um arquivo chamado 'app.db' dentro da pasta  tmp */
    filename: env.DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    // configurando a extensão que queremos usar nas migrations
    extension: 'ts',
    // configurando o diretório
    directory: './db/migrations',
  },
}

export const knex = setupKnex(config)
