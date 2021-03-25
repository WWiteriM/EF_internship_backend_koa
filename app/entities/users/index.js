const bcrypt = require('bcryptjs');
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
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hash = await bcrypt.hash(body.password, salt);
  const password = hash || result.password;

  await User.query()
    .update({
      name,
      surname,
      email,
      password,
    })
    .findById(id);
}

async function findUserByMail(body) {
  const user = await User.query().findOne({ email: body.email });
  if (!user) {
    throw ErrorService.errorThrow(404);
  }
  return user;
}

module.exports = {
  getUserById,
  deleteUserById,
  updateUserById,
  findUserByMail,
};
