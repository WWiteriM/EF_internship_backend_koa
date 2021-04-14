const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/users');
const ErrorService = require('../../middleware/error/errorServices');
const { jwtValidate } = require('./jwtValidation');
const { registrationMailer, recoveryMailer } = require('../../services/email/index');

async function registrationUser(body) {
  const { email, password, name, surname } = body;
  const user = await User.query().findOne({ email });
  if (user) {
    throw ErrorService.errorThrow(400);
  }
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hash = await bcrypt.hash(password, salt);
  const newUser = await User.query().insert({
    name,
    surname,
    email,
    password: hash,
  });
  const payload = {
    email,
  };
  const token = await jwt.sign(payload, process.env.SECRET, { expiresIn: '15m' });
  await User.query()
    .update({
      activationToken: token,
    })
    .findById(newUser.id);
  await registrationMailer(newUser, token);
  return newUser;
}

async function loginUser(body) {
  const { email, password } = body;
  const user = await User.query().findOne({ email });
  if (!user) {
    throw ErrorService.errorThrow(404);
  } else if (user.activationToken) {
    throw ErrorService.errorThrow(403);
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    const payload = {
      id: user.id,
      email: user.email,
    };
    return jwt.sign(payload, process.env.SECRET, { expiresIn: '15m' });
  }
  throw ErrorService.errorThrow(400);
}

async function activateUser(query) {
  const { activationToken, id } = query;
  const user = await User.query().findById(id);
  if (!user) {
    throw ErrorService.errorThrow(404);
  }
  await jwtValidate(activationToken);
  await User.query()
    .update({
      activationToken: null,
    })
    .findById(id);
  return user.id;
}

async function recoverUserPassword(body) {
  const { email } = body;
  const user = await User.query().findOne({ email });
  if (!user) {
    throw ErrorService.errorThrow(404);
  }
  const payload = {
    id: user.id,
    updatedAt: user.updatedAt,
  };
  const token = await jwt.sign(payload, process.env.SECRET, { expiresIn: '15m' });
  await User.query()
    .update({
      recoveryPasswordToken: token,
    })
    .findById(user.id);
  await recoveryMailer(user, token);
  return user.id;
}

async function enterNewUserPassword(body, query) {
  const { newPassword } = body;
  const { recoveryPasswordToken, id } = query;
  const user = await User.query().findById(id);
  if (!user) {
    throw ErrorService.errorThrow(404);
  }
  await jwtValidate(recoveryPasswordToken);
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const password = await bcrypt.hash(newPassword, salt);
  await User.query()
    .update({
      recoveryPasswordToken: null,
      password,
    })
    .findById(id);
  return user.id;
}

module.exports = {
  registrationUser,
  loginUser,
  activateUser,
  recoverUserPassword,
  enterNewUserPassword,
};
