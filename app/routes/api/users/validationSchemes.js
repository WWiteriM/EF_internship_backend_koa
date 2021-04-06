const yup = require('yup');

const updateUserInfoSchema = yup.object().shape({
  name: yup.string().trim(),
  surname: yup.string().trim(),
  email: yup.string().email(),
});

const updatePasswordSchema = yup.object().shape({
  oldPassword: yup.string().min(4).max(20).required(),
  newPassword: yup.string().min(4).max(20).required(),
});

module.exports = {
  updateUserInfoSchema,
  updatePasswordSchema,
};
