const User = require('../../models/users');

async function getUserById(id) {
  const [result] = await User.query().where('id', id);
  return result;
}

async function deleteUserById(id) {
  await User.query().delete().findById(id);
}

async function addUser(params) {
  await User.query().insert(params);
}

async function updateUserById(id, params) {
  await User.query().update(params).findById(id);
}

module.exports = {
  getUserById,
  deleteUserById,
  addUser,
  updateUserById,
};
