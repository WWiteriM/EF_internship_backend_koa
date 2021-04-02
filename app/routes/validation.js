const Error404 = require('../middleware/error/Error404');
const ErrorService = require('../middleware/error/errorServices');

function validate(schema) {
  return async (ctx, next) => {
    try {
      await schema.validate(ctx.request.body);
      await next();
    } catch (err) {
      if (err instanceof Error404) {
        throw ErrorService.errorThrow(404);
      }
      throw ErrorService.errorThrow(400);
    }
  };
}

module.exports = { validate };
