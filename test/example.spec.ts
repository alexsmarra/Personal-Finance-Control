import { test, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'

beforeAll(async () => {
  /* para aguardar até que nosso app esteja pronto, assim que o Fastify
  terminar de instalar (executar) os nossos plugins */
  await app.ready()
})

afterAll(async () => {
  // apagar da memória
  await app.close()
})

test('User can create a new transaction', async () => {
  // ver explicação desse 'server' no notion em: "Testes automatizados/Testando criação de transação"
  await request(app.server)
    .post('/transactions')
    .send({
      title: 'New transaction',
      amount: 5000,
      type: 'credit',
    })
    .expect(201)
})
