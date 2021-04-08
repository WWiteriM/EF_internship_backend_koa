// eslint-disable-next-line func-names
exports.up = function (knex) {
  return knex.schema.createTable('users_to_dialogs', (table) => {
    table.increments().primary();
    table.integer('user_id').unsigned().references('users.id');
    table.integer('dialog_id').unsigned().references('dialogs.id');
    table.string('createdAt').notNullable();
    table.string('updatedAt');
  });
};

// eslint-disable-next-line func-names
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users_to_dialogs');
};
