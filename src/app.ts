import fastify from 'fastify'
import cookie from '@fastify/cookie'

import { transactionsRoutes } from './routes/transactions'

export const app = fastify()
// Lembrando que o 'cookie' que estamos chamando, é um plugin como qualquer outro
app.register(cookie)

app.register(transactionsRoutes, {
  prefix: 'transactions',
})
