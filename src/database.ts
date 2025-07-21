import { knex as setupKnex } from 'knex'

export const knex = setupKnex({
  // banco de dados que estamos utilizando
  client: 'sqlite',
  /* informações obrigatórias sobre a nossa conexão, que no sqlite precisamos
  informar apenas o nome do arquivo */
  connection: {
    /* criar uma pasta 'tmp' antes, na raíz de nosso código, esse código
    ira criar um arquivo chamado 'app.db' dentro da pasta  tmp */
    filename: './tmp/app.db',
  },
})
