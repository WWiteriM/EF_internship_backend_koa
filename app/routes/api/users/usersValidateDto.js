function usersAddValidation(schema) {
  return async (ctx, next) => {
    try {
      await schema.validate(ctx.request.body);
      await next();
    } catch (err) {
      ctx.status = 400;
      ctx.body = err.message;
    }
  };
}

function usersUpdateValidation(schema) {
  return async (ctx, next) => {
    try {
      await schema.validate(ctx.request.body);
      await next();
    } catch (err) {
      ctx.status = 400;
      ctx.body = err.message;
    }
  };
}

module.exports = { usersAddValidation, usersUpdateValidation };
