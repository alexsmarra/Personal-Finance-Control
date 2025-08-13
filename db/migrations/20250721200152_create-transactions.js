"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
/* Sempre buscar usar as nomenclaturas que sejam padrões para facilitar uma
possível futura migração de um banco de dados para outro */
async function up(knex) {
    await knex.schema.createTable('transactions', (table) => {
        /* We'll use a more random and difficult-to-discover value as the
        primary key: the Universal Unique ID. 'id' is for field name and
        'primary' is for primary key  */
        table.uuid('id').primary(); // 'id' column
        // text format and it cannot be null
        table.text('title').notNullable();
        table.decimal('amount', 10, 2).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now).notNullable();
    });
}
async function down(knex) {
    // to delete the table
    await knex.schema.dropTable('transactions');
}
