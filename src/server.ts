import { app } from './app'
import { env } from './env'

/* esse listen retorna uma promise (.then) do Javascript, e quando essa promise 
terminar de ser executada, dará o nosso console.log abaixo */
app
  .listen({
    port: env.PORT,
    /* Config do Render para realizar o deploy corretamente. */
    host: 'RENDER' in process.env ? '0.0.0.0' : 'localhost',
  })
  .then(() => {
    console.log(`HTTP server running on PORT ${env.PORT}!`)
  })
