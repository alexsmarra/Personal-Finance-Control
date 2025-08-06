import { app } from './app'
import { env } from './env'

/* esse listen retorna uma promise (.then) do Javascript, e quando essa promise 
terminar de ser executada, dará o nosso console.log abaixo */
app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP server running!')
  })
