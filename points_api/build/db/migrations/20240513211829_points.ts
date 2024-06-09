import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('points', (table) => {
    table.uuid('id').primary()
    table.bigInteger('user_id').unsigned()
    table.decimal('value', 10, 2).notNullable()
    table.text('month').notNullable()
    table.text('message').notNullable()
    table
      .foreign('user_id')
      .references('users.id')
      .onDelete('SET NULL')
      .onUpdate('SET NULL')
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('points')
}
