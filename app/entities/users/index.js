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

async function updateUserById(id, body) {
  const result = await User.query().findById(id);
  if (!result) {
    throw ErrorService.errorThrow(404);
  }
  const name = body.name || result.name;
  const surname = body.surname || result.surname;
  const email = body.email || result.email;
  const password = body.password || result.password;

  await User.query()
    .update({
      name,
      surname,
      email,
      password,
    })
    .findById(id);
}

module.exports = {
  getUserById,
  deleteUserById,
  updateUserById,
};
