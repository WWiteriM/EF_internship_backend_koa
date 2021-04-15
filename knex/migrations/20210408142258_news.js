// eslint-disable-next-line func-names
exports.up = function (knex) {
  return knex.schema.createTable('news', (table) => {
    table.increments().primary();
    table.string('title');
    table.string('text');
    table.integer('userId').unsigned().references('users.id');
    table.string('createdAt').notNullable();
    table.string('updatedAt');
  });
};

// eslint-disable-next-line func-names
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('news');
};
