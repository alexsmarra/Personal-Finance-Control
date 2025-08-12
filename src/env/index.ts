/* para ler o arquivo .env no root de nosso app, expondo todos os valores dentro 
de uma variável global chamada  process.env , se dermos aqui um console.log(process.env)
será possível visualizar essas variáveis */
import { config } from 'dotenv'

/* para formar um schema, que é um formato de dado, para sabermos o formato de
dados que receberemos de nossas variáveis ambiente, e faremos um único schema 
para todas as variáveis ambiente */
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  /* caso não encontre, irá fazer o config no arquivo padrão, isto é, utilizando
  como path o arquivo .env */
  config()
}

/* aqui dentro colocaremos as variáveis de nosso app */
const envSchema = z.object({
  /* Diz o ambiente (development, test e production, que são os ambientes mais comuns) 
  em que nosso app está rodando. enum() server para escolher entre as opções do 
  parâmetro, e deixamos como padrão a 'production' */
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  /* Dizendo que precisa ser uma string. Se ela não fosse obrigatória, colocaríamos 
  'z.string().nullable()' (apenas de curiosidade) */
  DATABASE_URL: z.string(),
  // porta do tipo number, padrão de 3333, não sendo obrigatória por conta do 'default()'
  PORT: z.number().default(3333),
})

/* o 'safeParse' irá verificar se o nosso contrato envSchema está de acordo com o 
DATABASE_URL encontrado em process.env , caso contrário, mas ao contrário do 'parse'
não traz uma mensagem de erro tão específica
de erro. O  _env é para nome temporário.  */
const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  /* toString() é usado para converter o objeto de erro do Zod (_env.error) em 
  uma string legível e informativa, caso falte alguma variável ambiente ou para
  erro de sintaxe */
  console.error('⚠️ Invalid environment variables.', _env.error.toString())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data
