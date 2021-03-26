const yup = require('yup');
const Error404 = require('../../../middleware/error/Error404');
const ErrorService = require('../../../middleware/error/errorServices');

const registerSchema = yup.object().shape({
  name: yup.string().trim().required(),
  surname: yup.string().trim().required(),
  email: yup.string().email().required(),
  password: yup.string().min(4).max(20).required(),
});

const updateUserInfoSchema = yup.object().shape({
  name: yup.string().trim(),
  surname: yup.string().trim(),
  email: yup.string().email(),
  password: yup.string().min(4).max(20),
});

const updatePasswordSchema = yup.object().shape({
  email: yup.string().email(),
  password: yup.string().min(4).max(20),
  newPassword: yup.string().min(4).max(20),
});

const deleteUserSchema = yup.object().shape({
  email: yup.string().email(),
});

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

module.exports = {
  registerSchema,
  updateUserInfoSchema,
  updatePasswordSchema,
  deleteUserSchema,
  validate,
};
