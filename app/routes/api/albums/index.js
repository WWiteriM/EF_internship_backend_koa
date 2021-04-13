const Router = require('koa-router');
const passport = require('koa-passport');
const AlbumEntity = require('../../../entities/albums/index');
const { bodyValidate, queryValidate } = require('../../validation');
const {
  addAlbumBodySchema,
  getAlbumByIdQuerySchema,
  updateAlbumBodySchema,
  updateAlbumQuerySchema,
  deleteAlbumQuerySchema,
} = require('./validationSchemes');

const router = new Router({
  prefix: '/albums',
});

router
  .get(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    queryValidate(getAlbumByIdQuerySchema),
    getAlbumById,
  )
  .get('/', passport.authenticate('jwt', { session: false }), getAlbums)
  .post(
    '/',
    passport.authenticate('jwt', { session: false }),
    bodyValidate(addAlbumBodySchema),
    addAlbum,
  )
  .put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    queryValidate(updateAlbumQuerySchema),
    bodyValidate(updateAlbumBodySchema),
    updateAlbum,
  )
  .delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    queryValidate(deleteAlbumQuerySchema),
    deleteAlbum,
  );

async function getAlbumById(ctx) {
  const { id } = ctx.params;
  const userId = ctx.state.user.id;
  ctx.body = await AlbumEntity.getAlbum(id, userId);
  ctx.status = 200;
}

async function getAlbums(ctx) {
  const { id } = ctx.state.user;
  ctx.body = await AlbumEntity.getAllAlbums(id);
  ctx.status = 200;
}

async function addAlbum(ctx) {
  const params = ctx.request.body;
  const { id } = ctx.state.user;
  ctx.body = await AlbumEntity.addNewAlbum(id, params);
  ctx.status = 201;
}

async function updateAlbum(ctx) {
  const { id } = ctx.params;
  const params = ctx.request.body;
  const userId = ctx.state.user.id;
  ctx.body = await AlbumEntity.updateAlbumInfo(id, params, userId);
  ctx.status = 200;
}

async function deleteAlbum(ctx) {
  const { id } = ctx.params;
  const userId = ctx.state.user.id;
  ctx.body = await AlbumEntity.deleteAlbumById(id, userId);
  ctx.status = 200;
}

module.exports = router;
