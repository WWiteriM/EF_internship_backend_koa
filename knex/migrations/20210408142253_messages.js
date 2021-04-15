// eslint-disable-next-line func-names
exports.up = function (knex) {
  return knex.schema.createTable('messages', (table) => {
    table.increments().primary();
    table.integer('dialogId').unsigned().references('dialogs.id');
    table.string('text');
    table.string('createdAt').notNullable();
    table.string('updatedAt');
  });
};

// eslint-disable-next-line func-names
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('messages');
};
