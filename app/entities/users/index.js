const User = require('../../models/users');

function getProfileFunc(id) {
  return User.query().where('id', id);
}

function deleteProfileFunc(id) {
  return User.query().delete().where('id', id);
}

function addProfileFunc(params) {
  return User.query().insert(params);
}

function updateProfileFunc(id, params) {
  return User.query().update(params).where('id', id);
}

module.exports = {
  getProfileFunc,
  deleteProfileFunc,
  addProfileFunc,
  updateProfileFunc,
};
