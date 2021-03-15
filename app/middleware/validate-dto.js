function validateDto(schema) {
  return async (ctx, next) => {
    try {
      ctx.body = await schema.validate(ctx.body);
      next();
    } catch (err) {
      ctx.status = 400;
      ctx.body = err.message;
    }
  };
}

module.exports = validateDto;
