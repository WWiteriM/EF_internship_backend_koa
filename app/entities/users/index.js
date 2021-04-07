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
  const user = await User.query().deleteById(id);
  if (!user) {
    throw ErrorService.errorThrow(404);
  }
}

async function updateUserInfo(id, body) {
  const user = await User.query().update(body).findById(id);
  if (!user) {
    throw ErrorService.errorThrow(404);
  }
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
