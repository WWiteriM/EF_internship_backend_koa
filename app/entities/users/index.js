const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/users');
const { recoveryMailer } = require('../../services/email/index');
const ErrorService = require('../../middleware/error/errorServices');

async function getUserById(id) {
  const result = await User.query().findById(id);
  if (!result) {
    throw ErrorService.errorThrow(404);
  }
  return result;
}

async function deleteUser(body) {
  const { email } = body;
  const result = await User.query().findOne({ email });
  if (!result) {
    throw ErrorService.errorThrow(404);
  }
  await User.query().delete().findOne({ email });
}

async function updateUser(body) {
  const { email, name, surname } = body;
  const result = await User.query().findOne({ email });
  if (!result) {
    throw ErrorService.errorThrow(404);
  }
  const updatedName = name || result.name;
  const updatedSurname = surname || result.surname;

  await User.query()
    .update({
      name: updatedName,
      surname: updatedSurname,
    })
    .findOne({ email });
}

async function updatePassword(body) {
  const { email, oldPassword, newPassword } = body;
  const user = await User.query().findOne({ email });
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
    .findOne({ email });
}

async function recoverPassword(body) {
  const { email } = body;
  const user = await User.query().findOne({ email });
  if (!user) {
    throw ErrorService.errorThrow(404);
  }
  const payload = {
    email: user.email,
    updatedAt: user.updatedAt,
  };
  const token = await jwt.sign(payload, process.env.SECRET, { expiresIn: 3600 * 24 });
  await recoveryMailer(user, token);
  await User.query()
    .update({
      recoveryPasswordToken: token,
    })
    .findOne({ email });
}

async function addNewPassword(body, query) {
  const { newPassword } = body;
  const user = await User.query().findOne({
    recoveryPasswordToken: query.token,
    email: query.email,
  });
  if (!user) {
    throw ErrorService.errorThrow(404);
  }
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const password = await bcrypt.hash(newPassword, salt);

  await User.query()
    .update({
      recoveryPasswordToken: null,
      password,
    })
    .findOne({ email: query.email });
}

module.exports = {
  getUserById,
  deleteUser,
  updateUser,
  updatePassword,
  recoverPassword,
  addNewPassword,
};
