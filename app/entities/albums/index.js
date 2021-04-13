const Album = require('../../models/albums');
const ErrorService = require('../../middleware/error/errorServices');

async function getAlbum(id, userId) {
  const album = await Album.query().findById(id).where('userId', userId);
  if (!album) {
    throw ErrorService.errorThrow(404);
  }
  return album;
}

async function addNewAlbum(id, body) {
  const { name } = body;
  const newAlbum = await Album.query().insert({ name, userId: id });
  return newAlbum.id;
}

async function getAllAlbums(id) {
  const albums = await Album.query()
    .whereExists(Album.relatedQuery('album_info'))
    .where('userId', id);
  if (!albums.length) {
    throw ErrorService.errorThrow(404);
  }
  return albums;
}

async function updateAlbumInfo(id, body, userId) {
  const { name } = body;
  const album = await Album.query().findById(id).where('userId', userId);
  if (!album) {
    throw ErrorService.errorThrow(404);
  }
  await Album.query().update({ name }).findById(id).where('userId', userId);
  return id;
}

async function deleteAlbumById(id, userId) {
  const album = await Album.query().deleteById(id).where('userId', userId);
  if (!album) {
    throw ErrorService.errorThrow(404);
  }
  return id;
}

module.exports = {
  getAlbum,
  addNewAlbum,
  getAllAlbums,
  updateAlbumInfo,
  deleteAlbumById,
};
