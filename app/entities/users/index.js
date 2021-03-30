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
  const result = await User.query().findOne({ email: body.email });
  if (!result) {
    throw ErrorService.errorThrow(404);
  }
  await User.query().delete().findOne({ email: body.email });
}

async function updateUser(body) {
  const result = await User.query().findOne({ email: body.email });
  if (!result) {
    throw ErrorService.errorThrow(404);
  }
  const name = body.name || result.name;
  const surname = body.surname || result.surname;

  await User.query()
    .update({
      name,
      surname,
    })
    .findOne({ email: body.email });
}

async function updatePassword(body) {
  const user = await User.query().findOne({ email: body.email });
  if (!user) {
    throw ErrorService.errorThrow(404);
  }
  const isMatch = await bcrypt.compare(body.password, user.password);
  if (!isMatch) {
    throw ErrorService.errorThrow(400);
  }
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const password = await bcrypt.hash(body.newPassword, salt);

  await User.query()
    .update({
      password,
    })
    .findOne({ email: body.email });
}

async function recoverPassword(body) {
  const user = await User.query().findOne({ email: body.email });
  if (!user) {
    throw ErrorService.errorThrow(404);
  }
  const payload = {
    email: user.email,
  };
  const token = await jwt.sign(payload, process.env.SECRET, { expiresIn: 3600 * 24 });
  await recoveryMailer(user, token);
  await User.query()
    .update({
      token,
    })
    .findOne({ email: body.email });
}

module.exports = {
  getUserById,
  deleteUser,
  updateUser,
  updatePassword,
  recoverPassword,
};
