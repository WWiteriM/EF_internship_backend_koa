const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/users');
const ErrorService = require('../../middleware/error/errorServices');

async function registerUser(body) {
  const user = await User.query().findOne({ email: body.email });
  if (user) {
    throw ErrorService.errorThrow(400);
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(body.password, salt);
  await User.query().insert({
    name: body.name,
    surname: body.surname,
    email: body.email,
    password: hash,
  });
}

async function loginUser(body) {
  const user = await User.query().findOne({ email: body.email });
  if (!user) {
    throw ErrorService.errorThrow(404);
  }
  const isMatch = await bcrypt.compare(body.password, user.password);
  if (isMatch) {
    const payload = {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
    };
    return jwt.sign(payload, process.env.SECRET, { expiresIn: 3600 * 24 });
  }
  throw ErrorService.errorThrow(400);
}

module.exports = {
  registerUser,
  loginUser,
};
