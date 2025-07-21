import fastify from 'fastify'
import { knex } from './database.js'

const app = fastify()

// GET, POST, PUT, PATCH e DELETE
// exemplo: http://localhost:3333/hello

app.get('/hello', async () => {
  /* apenas para testar o banco, chamando todos ('*') os dados da tabela 
  'sqlite_schema', um nome padrão utilizado */
  const tables = await knex('sqlite_schema').select('*')
  return tables
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
