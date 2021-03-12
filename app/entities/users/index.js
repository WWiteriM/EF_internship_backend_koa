const dbSetup = require('../../../knex/db-setup');
const User = require('../../models/users');

dbSetup();

function getProfileById(id) {
  return User.query().where('id', id);
}

function deleteProfileById(id) {
  return User.query().delete().where('id', id);
}

module.exports = { getProfileById, deleteProfileById };
