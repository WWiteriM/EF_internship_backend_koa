const Router = require('koa-router');
const passport = require('koa-passport');
const AlbumEntity = require('../../../entities/albums/index');
const { bodyValidate, queryValidate } = require('../../validation');
const { addAlbumBodySchema, getAlbumByIdQuerySchema } = require('./validationSchemes');

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
  );

async function getAlbumById(ctx) {
  const { id } = ctx.params;
  ctx.body = await AlbumEntity.getAlbum(id);
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

module.exports = router;
