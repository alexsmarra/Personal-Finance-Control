import { FastifyInstance } from 'fastify'
import { knex } from '../database.js'

/* FastifyInstance quer dizer que é a instância de nossa aplicação (tem relação com o 
tipo do parâmetro que deve ser colocado, pesquisar depois) */
export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/hello', async () => {
    const transaction = await knex('transactions')
      .where('amount', 1000)
      .select('*')

    return transaction
  })
}
