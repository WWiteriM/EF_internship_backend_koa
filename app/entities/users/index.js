const User = require('../../models/users');

function getProfileById(id) {
  return User.query().where('id', id);
}

function deleteProfileById(id) {
  return User.query().delete().where('id', id);
}

module.exports = { getProfileById, deleteProfileById };
