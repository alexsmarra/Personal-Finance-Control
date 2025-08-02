import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database.js'
import { randomUUID } from 'crypto'
import { checkSessionIdExists } from '../middlewares/check-session-id-exist.js'

/* FastifyInstance quer dizer que é a instância de nossa aplicação (tem relação com o 
tipo do parâmetro que deve ser colocado, pesquisar depois) */
export async function transactionsRoutes(app: FastifyInstance) {
  // rota para buscar por todas as transactions conforme id de usuário

  /* Em nossas rotas, não apenas nessa específica abaixo, no segundo 
  parâmetro, temos um objeto que podemos colocar várias configurações,
  e vamos utilizar o preHandler para utilização de nosso middleware, que como o 
  próprio nome já diz, vem antes do handler (handler é o nome dado para o que 
  lida com o funcionamento da rota), e nele (no preHandler) nós podemos colocar 
  várias funções, por isso colocamos dentro de um array */
  app.get(
    '/',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const { sessionId } = request.cookies

      // no knex, o '*' dentro do 'select()' é opcional
      const transactions = await knex('transactions')
        .where('session_id', sessionId)
        .select()

      return {
        transactions,
      }
    },
  )

  // buscar por uma transação específica. Acessar os parâmetros nomeados na url ('/:id')
  app.get(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies

      const getTransactionParamsSchema = z.object({
        id: z.uuid(),
      })

      const { id } = getTransactionParamsSchema.parse(request.params)

      // 'first()' porque queremos apenas o primeiro resultado da busca
      const transaction = await knex('transactions')
        // .where dentro de um objeto pelo motivo de conter 2 buscas
        .where({
          session_id: sessionId,
          id,
        })
        .first()

      return { transaction }
    },
  )

  // somar os valores de uma coluna (total)
  app.get(
    '/summary',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies
      // método 'sum()' para somar todos os valores de uma coluna
      const summary = await knex('transactions')
        .where('session_id', sessionId)
        .sum('amount', { as: 'amount' })
        .first()

      return { summary }
    },
  )

  /* Permitir que o usuário crie uma nova transação. Para isso, utilizaremos o body
   de nossa requisição. 'reply' é  como o Fastify chama o 'response' */
  app.post('/', async (request, reply) => {
    /* title, amount, type: credit or debit */
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    /* validando o nosso request.body para ver se dá match com o nosso schema,
      caso não valide, não dará o return abaixo, pois o parse cairá em um throw */
    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    )

    /* Estamos procurando dentro dos cookies de nossa requisição (os metadados
    invisíveis digamos assim) se já existe uma sessionId, e caso exista, será
    inserido no banco (em 'await knex('transactions').. logo abaixo) */
    let sessionId = request.cookies.sessionId

    /* ... caso não exista.. */
    if (!sessionId) {
      /* iremos criar um sessionId para ele.. */
      sessionId = randomUUID()

      /* ... e salvaremos nos cookies uma informação chamada 'sessionId' com
      o valor que acabamos de criar acima ('sessionId = randomUUID()). */
      reply.cookie('sessionId', sessionId, {
        /* dentro dos cookies podemos passar informações, e as mais importantes
        são: */
        /* quais rotas esse cookie estará disponível para o backend acessar, 
        como colocamos a '/', quer dizer que qualquer rota poderá acessar os 
        cookies. 
        */
        path: '/',
        /* tempo de expiração do cookie, isto é, em algum momento esse cookie 
        salvo no navegador do usuário, precisa expirar. Se passarmos o 'expires',
        precisamos passar exatamente o dia e horário que o cookie deve expirar, 
        por isso passaremos uma outra opção, o 'maxAge', nele temos que passar
        apenas em segundos a quantidade de tempo que ele deve durar. Para
        não ficar ilegível colocaremos da seguinte forma, para facilitar o
        entendimento e manutenção:
        60 (quantidade de segundos em 1 minuto), 60 (quantidade de minutos em uma
        hora), 24 (quantidade de horas em 1 dia), 7 (quantidade de dias em 1 semana),
        mais um comentário do que significa esse total. */
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
    }

    /* Cadastrando no banco (na tabela transactions). HTTP codes apenas (sem 
    'return, isto é, com a resposta vazia) */
    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    /* 'reply' é  como o Fastify chama o 'response' */
    return reply.status(201).send()
  })
}
