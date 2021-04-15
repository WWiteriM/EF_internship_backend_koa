// eslint-disable-next-line func-names
exports.up = function (knex) {
  return knex.schema.createTable('photos', (table) => {
    table.increments().primary();
    table.string('path');
    table.string('description');
    table.string('tag');
    table.integer('albumId').unsigned().references('albums.id');
    table.string('createdAt').notNullable();
    table.string('updatedAt');
  });
};

// eslint-disable-next-line func-names
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('photos');
};
