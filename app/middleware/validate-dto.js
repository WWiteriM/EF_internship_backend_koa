function validateDto(schema) {
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

module.exports = validateDto;
