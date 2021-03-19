const yup = require('yup');
const ErrorService = require('../../../middleware/error/errorServices');

const registerSchema = yup.object().shape({
  name: yup.string().trim().required(),
  surname: yup.string().trim().required(),
  email: yup.string().email().required(),
  password: yup.string().min(4).max(20).required(),
});

const updateSchema = yup.object().shape({
  name: yup.string().trim(),
  surname: yup.string().trim(),
  email: yup.string().email(),
  password: yup.string().min(4).max(20),
});

function validate(schema) {
  return async (ctx, next) => {
    // eslint-disable-next-line no-useless-catch
    try {
      await schema.validate(ctx.request.body);
      await next();
    } catch (err) {
      if (err.code === 404) {
        throw err;
      }
      throw ErrorService.errorThrow(400);
    }
  };
}

module.exports = { registerSchema, updateSchema, validate };
