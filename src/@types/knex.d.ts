// arquivo para definição de tipos, código que apenas o typeScript entende

/* Quando queremos sobrescrever um tipo que vem de dentro de uma biblioteca,
precisamos primeiramente importar essa biblioteca
*/
// eslint-disable-next-line
import { knex } from 'knex' // esse comentário acima desabilita o erro da palavra 'Knex'

declare module 'knex/types/tables' {
  // vamos informar quais tabelas tem em nosso banco de dados
  export interface Tables {
    transactions: {
      id: string
      title: string
      amount: number
      // em nosso bd é salvo como string, embora sabemos que é uma data
      created_at: string
      /* "?" porque nós colocamos esse campo como opcional (sem o notNullable() ) 
      em nosso bd */
      session_id?: string
    }
  }
}
