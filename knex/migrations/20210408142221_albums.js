// eslint-disable-next-line func-names
exports.up = function (knex) {
  return knex.schema.createTable('albums', (table) => {
    table.increments().primary();
    table.string('name');
    table.integer('user_id').unsigned().references('users.id');
    table.string('createdAt').notNullable();
    table.string('updatedAt');
  });
};

// eslint-disable-next-line func-names
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('albums');
};
