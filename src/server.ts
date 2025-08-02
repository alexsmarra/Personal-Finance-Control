import fastify from 'fastify'
import cookie from '@fastify/cookie'

import { env } from './env'
import { transactionsRoutes } from './routes/transactions'

const app = fastify()
// Lembrando que o 'cookie' que estamos chamando, é um plugin como qualquer outro
app.register(cookie)

app.register(transactionsRoutes, {
  prefix: 'transactions',
})

/* esse listen retorna uma promise (.then) do Javascript, e quando essa promise 
terminar de ser executada, dará o nosso console.log abaixo */
app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP server running!')
  })
