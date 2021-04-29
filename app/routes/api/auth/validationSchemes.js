const yup = require('yup');

const registerBodySchema = yup.object().shape({
  name: yup.string().trim().required(),
  surname: yup.string().trim().required(),
  email: yup.string().email().required(),
  password: yup.string().min(4).max(20).required(),
});

const loginBodySchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(4).max(20).required(),
});

const recoverUserPasswordBodySchema = yup.object().shape({
  email: yup.string().email().required(),
});

const newPasswordBodySchema = yup.object().shape({
  newPassword: yup.string().min(4).max(20).required(),
});

const activateParamsSchema = yup.object().shape({
  id: yup.number().required(),
  activationToken: yup.string().required(),
});

const newPasswordParamsSchema = yup.object().shape({
  id: yup.number().required(),
  recoveryPasswordToken: yup.string().required(),
});

const refreshTokenBodySchema = yup.object().shape({
  refreshToken: yup.string().required(),
});

module.exports = {
  registerBodySchema,
  recoverUserPasswordBodySchema,
  loginBodySchema,
  newPasswordBodySchema,
  newPasswordParamsSchema,
  activateParamsSchema,
  refreshTokenBodySchema,
};
