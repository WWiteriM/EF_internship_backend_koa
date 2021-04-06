const bcrypt = require('bcryptjs');
const User = require('../../models/users');
const ErrorService = require('../../middleware/error/errorServices');

async function getUser(id) {
  const user = await User.query().findById(id);
  if (!user) {
    throw ErrorService.errorThrow(404);
  }
  return user;
}

async function deleteUser(id) {
  const user = await User.query().findById(id);
  if (!user) {
    throw ErrorService.errorThrow(404);
  }
  await User.query().delete().findById(id);
}

async function updateUserInfo(id, body) {
  const { email, name, surname } = body;
  const user = await User.query().findById(id);
  if (!user) {
    throw ErrorService.errorThrow(404);
  }
  const updatedName = name || user.name;
  const updatedSurname = surname || user.surname;
  const updatedEmail = email || user.email;

  await User.query()
    .update({
      name: updatedName,
      surname: updatedSurname,
      email: updatedEmail,
    })
    .findById(id);
}

async function updateUserPassword(id, body) {
  const { oldPassword, newPassword } = body;
  const user = await User.query().findById(id);
  if (!user) {
    throw ErrorService.errorThrow(404);
  }
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    throw ErrorService.errorThrow(400);
  }
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const password = await bcrypt.hash(newPassword, salt);

  await User.query()
    .update({
      password,
    })
    .findById(id);
}

module.exports = {
  getUser,
  deleteUser,
  updateUserInfo,
  updateUserPassword,
};
