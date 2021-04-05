const jwt = require('jsonwebtoken');
const ErrorService = require('../error/errorServices');

async function jwtValidate(ctx, next) {
  const currentTime = new Date().setDate(new Date().getDate());
  const token = ctx.request.headers.authorization.split(' ')[1];
  const tokenLifeTime = await jwt.verify(token, process.env.SECRET);
  if (tokenLifeTime.exp < currentTime) {
    throw ErrorService.errorThrow(401);
  }
  await next();
}

module.exports = jwtValidate;
