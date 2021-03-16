const yup = require('yup');

const addUserSchema = yup.object().shape({
  name: yup.string().trim().required(),
  surname: yup.string().trim().required(),
  email: yup.string().email().required(),
  password: yup.string().min(4).max(20).required(),
});

const updateUserSchema = yup.object().shape({
  name: yup.string().trim(),
  surname: yup.string().trim(),
  email: yup.string().email(),
  password: yup.string().min(4).max(20),
});

module.exports = { addUserSchema, updateUserSchema };
