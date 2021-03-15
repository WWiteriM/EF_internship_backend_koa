const yup = require('yup');

module.exports = yup.object().shape({
  name: yup.string().trim().required(),
  surname: yup.string().trim().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(4),
});
