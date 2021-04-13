const yup = require('yup');

const addAlbumBodySchema = yup.object().shape({
  name: yup.string().trim().required(),
});

const updateAlbumBodySchema = yup.object().shape({
  name: yup.string().trim().required(),
});

const getAlbumByIdQuerySchema = yup.object().shape({
  id: yup.number().required(),
});

const updateAlbumQuerySchema = yup.object().shape({
  id: yup.number().required(),
});

const deleteAlbumQuerySchema = yup.object().shape({
  id: yup.number().required(),
});

module.exports = {
  addAlbumBodySchema,
  getAlbumByIdQuerySchema,
  updateAlbumBodySchema,
  updateAlbumQuerySchema,
  deleteAlbumQuerySchema,
};
