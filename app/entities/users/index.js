const User = require('../../models/users');

function getProfileById(id) {
  return User.query().where('id', id);
}

function deleteProfileById(id) {
  return User.query().delete().where('id', id);
}

function addProfile(params) {
  return User.query().insert(params);
}

function updateProfileById(id, params) {
  return User.query().update(params).where('id', id);
}

module.exports = {
  getProfileById,
  deleteProfileById,
  addProfile,
  updateProfileById,
};
