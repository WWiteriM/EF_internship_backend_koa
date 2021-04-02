// eslint-disable-next-line func-names
exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('name');
    table.string('surname');
    table.string('email').unique();
    table.string('password');
    table.string('recoveryPasswordToken');
    table.string('activationToken');
    table.string('createdAt').notNullable();
    table.string('updatedAt');
  });
};

// eslint-disable-next-line func-names
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
