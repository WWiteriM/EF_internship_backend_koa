const yup = require('yup');

const addFriendBodySchema = yup.object().shape({
  friendId: yup.number().required(),
});

const getFriendByIdQuerySchema = yup.object().shape({
  id: yup.number().required(),
});

const deleteFriendQuerySchema = yup.object().shape({
  id: yup.number().required(),
});

module.exports = {
  getFriendByIdQuerySchema,
  addFriendBodySchema,
  deleteFriendQuerySchema,
};
