const yup = require('yup');

const registerSchema = yup.object().shape({
  name: yup.string().trim().required(),
  surname: yup.string().trim().required(),
  email: yup.string().email().required(),
  password: yup.string().min(4).max(20).required(),
});

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(4).max(20).required(),
});

const recoverUserPasswordSchema = yup.object().shape({
  email: yup.string().email().required(),
});

const newPasswordSchema = yup.object().shape({
  newPassword: yup.string().min(4).max(20).required(),
});

module.exports = {
  registerSchema,
  recoverUserPasswordSchema,
  loginSchema,
  newPasswordSchema,
};
