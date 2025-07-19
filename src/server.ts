import fastify from 'fastify'

const app = fastify()

// GET, POST, PUT, PATCH e DELETE
// exemplo: http://localhost:3333/hello

app.get('/hello', () => {
  return 'Hello World!'
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
