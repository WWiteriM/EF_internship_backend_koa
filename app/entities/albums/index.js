const Album = require('../../models/albums');
const ErrorService = require('../../middleware/error/errorServices');

async function getAlbum(id) {
  const album = await Album.query().findById(id);
  if (!album) {
    throw ErrorService.errorThrow(404);
  }
  return album;
}

async function addNewAlbum(id, body) {
  const { name } = body;
  const album = await Album.query().findOne({ name }).where({ userId: id });
  if (album) {
    throw ErrorService.errorThrow(400);
  }
  const newAlbum = await Album.query().insert({ name, userId: id });
  return newAlbum.id;
}

async function getAllAlbums(id) {
  const albums = await Album.query().whereExists(Album.relatedQuery('info')).where('userId', id);
  if (!albums.length) {
    throw ErrorService.errorThrow(404);
  }
  return albums;
}

module.exports = {
  getAlbum,
  addNewAlbum,
  getAllAlbums,
};
