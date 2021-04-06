const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { addMinutes } = require('date-fns');
const User = require('../../models/users');
const ErrorService = require('../../middleware/error/errorServices');
const { registrationMailer } = require('../../services/email/index');

async function registerUser(body) {
  const { email, password, name, surname } = body;
  const user = await User.query().findOne({ email });
  if (user) {
    throw ErrorService.errorThrow(400);
  }
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hash = await bcrypt.hash(password, salt);
  await User.query().insert({
    name,
    surname,
    email,
    password: hash,
  });
  const timeOfLife = addMinutes(
    new Date().setDate(new Date().getDate()),
    process.env.JWT_LIFE_TIME,
  );
  const payload = {
    email,
    iat: new Date().getTime(),
    exp: timeOfLife.getTime(),
  };
  const token = await jwt.sign(payload, process.env.SECRET);
  await User.query()
    .update({
      activationToken: token,
    })
    .findOne({ email });
  await registrationMailer(body, token);
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
    const timeOfLife = addMinutes(
      new Date().setDate(new Date().getDate()),
      process.env.JWT_LIFE_TIME,
    );
    const payload = {
      id: user.id,
      email: user.email,
      iat: new Date().getTime(),
      exp: timeOfLife.getTime(),
    };
    return jwt.sign(payload, process.env.SECRET);
  }
  throw ErrorService.errorThrow(400);
}

async function activateUser(query) {
  const { activationToken, email } = query;
  const user = await User.query().findOne({
    activationToken,
    email,
  });
  if (!user) {
    throw ErrorService.errorThrow(404);
  }
  const currantTime = new Date().setDate(new Date().getDate());
  const tokenLifeTime = await jwt.verify(activationToken, process.env.SECRET);
  if (tokenLifeTime.exp < currantTime) {
    throw ErrorService.errorThrow(403);
  }
  await User.query()
    .update({
      activationToken: null,
    })
    .findOne({ email });
}

module.exports = {
  registerUser,
  loginUser,
  activateUser,
};
