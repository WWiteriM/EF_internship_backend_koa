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
  const result = await User.query().findById(id);
  if (!result) {
    throw ErrorService.errorThrow(404);
  }
  await User.query().delete().findById(id);
}

async function addUser(params) {
  const result = await User.query().findById(params.id);
  if (result) {
    throw ErrorService.errorThrow(400);
  }
  await User.query().insert(params);
}

async function updateUserById(id, params) {
  const result = User.query().findById(id);
  if (!result) {
    throw ErrorService.errorThrow(404);
  }
  await User.query()
    .update({
      name: `${params.name}`,
      surname: `${params.surname}`,
      email: `${params.email}`,
      password: `${params.password}`,
    })
    .findById(id);
}

module.exports = {
  getUserById,
  deleteUserById,
  addUser,
  updateUserById,
};
