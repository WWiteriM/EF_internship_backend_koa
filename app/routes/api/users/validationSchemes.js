const yup = require('yup');

const updateUserInfoBodySchema = yup.object().shape({
  name: yup.string().trim(),
  surname: yup.string().trim(),
  email: yup.string().email(),
});

const updatePasswordBodySchema = yup.object().shape({
  oldPassword: yup.string().min(4).max(20).required(),
  newPassword: yup.string().min(4).max(20).required(),
});

const idQuerySchema = yup.object().shape({
  id: yup.number().required(),
});

module.exports = {
  updateUserInfoBodySchema,
  updatePasswordBodySchema,
  idQuerySchema,
};
