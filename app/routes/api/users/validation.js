const yup = require('yup');
const ErrorService = require('../../../middleware/error/errorServices');

const registerSchema = yup.object().shape({
  name: yup.string().trim().required(),
  surname: yup.string().trim().required(),
  email: yup.string().email().required(),
  password: yup.string().min(4).max(20).required(),
});

const updateSchema = yup.object().shape({
  name: yup.string().trim().required(),
  surname: yup.string().trim().required(),
  email: yup.string().email().required(),
  password: yup.string().min(4).max(20).required(),
});

function validate(schema) {
  return async (ctx, next) => {
    try {
      await schema.validate(ctx.request.body);
      await next();
    } catch (err) {
      throw ErrorService.errorThrow(400);
    }
  };
}

module.exports = { registerSchema, updateSchema, validate };
