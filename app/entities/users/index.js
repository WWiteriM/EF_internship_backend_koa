const User = require('../../models/users');
const ErrorService = require('../../middleware/error/errorServices');

async function getUserById(id) {
  const result = await User.query().findById(id);
  if (!result) {
    throw ErrorService.errorThrow(404);
  }
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
