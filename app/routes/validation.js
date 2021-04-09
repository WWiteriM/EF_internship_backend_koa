const Error404 = require('../middleware/error/Error404');
const ErrorService = require('../middleware/error/errorServices');

function bodyValidate(schema) {
  return async (ctx, next) => {
    await schema.validate(ctx.request.body).catch((err) => {
      if (err instanceof Error404) {
        throw ErrorService.errorThrow(404);
      }
      throw ErrorService.errorThrow(400);
    });
    await next();
  };
}

function queryValidate(schema) {
  return async (ctx, next) => {
    await schema.validate(ctx.params).catch((err) => {
      if (err instanceof Error404) {
        throw ErrorService.errorThrow(404);
      }
      throw ErrorService.errorThrow(400);
    });
    await next();
  };
}

function paramsValidate(schema) {
  return async (ctx, next) => {
    await schema.validate(ctx.request.query).catch((err) => {
      if (err instanceof Error404) {
        throw ErrorService.errorThrow(404);
      }
      throw ErrorService.errorThrow(400);
    });
    await next();
  };
}

module.exports = { bodyValidate, queryValidate, paramsValidate };
