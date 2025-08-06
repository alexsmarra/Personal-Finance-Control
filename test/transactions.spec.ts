import { it, beforeAll, afterAll, describe } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'

/* Damos um nome para a categoria, para criarmos um contexto para os testes */
describe('Transactions routes', () => {
  beforeAll(async () => {
    /* para aguardar até que nosso app esteja pronto, assim que o Fastify
    terminar de instalar (executar) os nossos plugins */
    await app.ready()
  })

  afterAll(async () => {
    // apagar da memória
    await app.close()
  })

  // damos um nome para o teste
  it('should be able to create a new transaction', async () => {
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
})
