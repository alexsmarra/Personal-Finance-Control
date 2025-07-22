import fastify from 'fastify'
import crypto from 'node:crypto'
import { knex } from './database.js'

const app = fastify()

// GET, POST, PUT, PATCH e DELETE
// exemplo: http://localhost:3333/hello

app.get('/hello', async () => {
  const transaction = await knex('transactions')
    .where('amount', 10100)
    .select('*')

  return transaction
})

/* esse listen retorna uma promise (.then) do Javascript, e quando essa promise 
terminar de ser executada, dará o nosso console.log abaixo */
app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP server running!')
  })
