const yup = require('yup');

const addAlbumBodySchema = yup.object().shape({
  name: yup.string().trim().required(),
});

const getAlbumByIdQuerySchema = yup.object().shape({
  id: yup.number().required(),
});

module.exports = {
  addAlbumBodySchema,
  getAlbumByIdQuerySchema,
};
