// eslint-disable-next-line func-names
exports.up = function (knex) {
  return knex.schema.createTable('dialogs', (table) => {
    table.increments().primary();
    table.string('name');
    table.string('createdAt').notNullable();
    table.string('updatedAt');
  });
};

// eslint-disable-next-line func-names
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('dialogs');
};
