import { expect, it, beforeAll, afterAll, describe, beforeEach } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'
import { execSync } from 'node:child_process'

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

  beforeEach(() => {
    /* Para desfazer todas as migrations, isto é, o 'rollback' vai executar
    o método 'down' de todas as nossas migrations, ou seja, zerar o nosso
    banco de dados */
    execSync('npm run knex migrate:rollback --all')
    /* Comando para rodar as migrations (ver explicação no Notion em "Configurando
    banco de testes") */
    execSync('npm run knex migrate:latest')
  })

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

  it('Should be able to list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })

    // cliente guarda o cookie
    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
      // para listagem
      .get('/transactions')
      /* 
      Para o cliente enviar o cookie que foi guardado na const cookies mais acima. 
      Com o '.set' que pegamos da documentação do supertest, que serve para setar uma 
      informação (um cabeçalho) da requisição */
      .set('Cookie', cookies)
      // httpCode de success
      .expect(200)

    expect(listTransactionsResponse.body.transactions).toEqual([
      /* Esperamos que dentro do objeto contenham as informações que são salvas no 
      banco de dados, que no caso é o title e o amount (o type não é salvo) */
      expect.objectContaining({
        title: 'New transaction',
        amount: 5000,
      }),
    ])
  })

  it('Should be able to get a specific transaction', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })

    // cliente guarda o cookie
    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
      // para listagem
      .get('/transactions')
      /* 
      Para o cliente enviar o cookie que foi guardado na const cookies mais acima. 
      Com o '.set' que pegamos da documentação do supertest, que serve para setar uma 
      informação (um cabeçalho) da requisição */
      .set('Cookie', cookies)
      // httpCode de success
      .expect(200)

    const transactionId = listTransactionsResponse.body.transactions[0].id

    const listTransactionResponse = await request(app.server)
      // para listagem
      .get(`/transactions/${transactionId}`)
      /* 
      Para o cliente enviar o cookie que foi guardado na const cookies mais acima. 
      Com o '.set' que pegamos da documentação do supertest, que serve para setar uma 
      informação (um cabeçalho) da requisição */
      .set('Cookie', cookies)
      // httpCode de success
      .expect(200)

    expect(listTransactionResponse.body.transaction).toEqual(
      /* Esperamos que dentro do objeto contenham as informações que são salvas no 
      banco de dados, que no caso é o title e o amount (o type não é salvo).
      Retiramos o array. */
      expect.objectContaining({
        title: 'New transaction',
        amount: 5000,
      }),
    )
  })

  it('Should be able to get the summary', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'Credit transaction',
        amount: 5000,
        type: 'credit',
      })

    // cliente guarda o cookie
    const cookies = createTransactionResponse.get('Set-Cookie')

    await request(app.server)
      .post('/transactions')
      .set('Cookie', cookies)
      .send({
        title: 'Debit transaction',
        amount: 2000,
        type: 'debit',
      })

    const summaryResponse = await request(app.server)
      // para listagem
      .get('/transactions/summary')
      /* 
      Para o cliente enviar o cookie que foi guardado na const cookies mais acima. 
      Com o '.set' que pegamos da documentação do supertest, que serve para setar uma 
      informação (um cabeçalho) da requisição */
      .set('Cookie', cookies)
      // httpCode de success
      .expect(200)

    expect(summaryResponse.body.summary).toEqual({
      /* 5000 (credit) - 2000 (debit) */
      amount: 3000,
    })
  })
})
