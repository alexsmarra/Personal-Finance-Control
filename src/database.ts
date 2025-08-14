// Knex é uma interface para configuração
import { knex as setupKnex, Knex } from 'knex'
import { env } from './env'

/* Dizendo para a const config para que ela siga as configurações de 
nossa interface Knex */
export const config: Knex.Config = {
  // banco de dados que estamos utilizando
  client: env.DATABASE_CLIENT,
  /* informações obrigatórias sobre a nossa conexão, que no sqlite precisamos
  informar apenas o nome do arquivo */
  connection:
    env.DATABASE_CLIENT === 'sqlite'
      ? {
          filename: env.DATABASE_URL,
        }
      : // se for PostgreSQL
        env.DATABASE_URL,
  useNullAsDefault: true,
  migrations: {
    // configurando a extensão que queremos usar nas migrations
    extension: 'ts',
    // configurando o diretório
    directory: './db/migrations',
  },
}

export const knex = setupKnex(config)
