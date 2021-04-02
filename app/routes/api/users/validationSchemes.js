const yup = require('yup');

const updateUserInfoSchema = yup.object().shape({
  name: yup.string().trim(),
  surname: yup.string().trim(),
  email: yup.string().email().required(),
});

const updatePasswordSchema = yup.object().shape({
  email: yup.string().email().required(),
  oldPassword: yup.string().min(4).max(20).required(),
  newPassword: yup.string().min(4).max(20).required(),
});

const checkingMailSchema = yup.object().shape({
  email: yup.string().email().required(),
});

const passwordRecoverySchema = yup.object().shape({
  newPassword: yup.string().min(4).max(20).required(),
});

module.exports = {
  updateUserInfoSchema,
  updatePasswordSchema,
  checkingMailSchema,
  passwordRecoverySchema,
};
