// const Error404 = require('../middleware/error/Error404');
// const Error403 = require('../middleware/error/Error403');
// const Error401 = require('../middleware/error/Error401');
const ErrorService = require('../middleware/error/errorServices');

function validate(schema) {
  return async (ctx, next) => {
    try {
      await schema.validate(ctx.request.body);
      await next();
    } catch (err) {
      throw ErrorService.errorThrow(err.code);
    }
  };
}

module.exports = { validate };
