const jwt = require('jsonwebtoken');
const ErrorService = require('../../middleware/error/errorServices');

async function jwtValidate(token) {
  try {
    return await jwt.verify(token, process.env.SECRET);
  } catch {
    throw ErrorService.errorThrow(401);
  }
}

module.exports = { jwtValidate };
