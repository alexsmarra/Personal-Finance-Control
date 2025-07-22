import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('transactions', (table) => {
    /* para dizer que a coluna criada abaixo 'session_id deve ficar abaixo
      da coluna 'id' da tabela transactions. Essa funcionalidade não é suportada
      por todos os bancos de dados. O index() é para criar um índice nesse campo
      da tabela, que é uma forma para falarmos ao bd que faremos muitas buscas
      em transações específicas de um id de uma sessão, ou seja, que o session id
      será muito utilizado dentro do where, sendo mais rápida a busca pelo fato do 
      bd criar um cache, de qual session_id possui quais transações */
    table.uuid('session_id').after('id').index()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('transactions', (table) => {
    /* para deletar a coluna que foi criada em nosso método up (acima) */
    table.dropColumn('session_id')
  })
}
