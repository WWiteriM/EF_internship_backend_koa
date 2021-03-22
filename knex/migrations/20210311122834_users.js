exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('name');
    table.string('surname');
    table.string('email').unique();
    table.string('password');
    table.string('createdAt').notNullable();
    table.string('updatedAt');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
