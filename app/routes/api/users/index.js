const Router = require('koa-router');
const passport = require('koa-passport');
const UserEntity = require('../../../entities/users/index');
const { bodyValidate, queryValidate } = require('../../validation');
const {
  updateUserInfoBodySchema,
  updatePasswordBodySchema,
  idQuerySchema,
} = require('./validationSchemes');

const router = new Router({
  prefix: '/users',
});

router
  .get(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    queryValidate(idQuerySchema),
    getUser,
  )
  .put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    queryValidate(idQuerySchema),
    bodyValidate(updateUserInfoBodySchema),
    updateUser,
  )
  .put(
    '/:id/password',
    passport.authenticate('jwt', { session: false }),
    queryValidate(idQuerySchema),
    bodyValidate(updatePasswordBodySchema),
    updatePassword,
  )
  .delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    queryValidate(idQuerySchema),
    deleteUser,
  );

async function getUser(ctx) {
  const { id } = ctx.params;
  ctx.body = await UserEntity.getUser(id);
  ctx.status = 200;
}

async function updateUser(ctx) {
  const { id } = ctx.params;
  const params = ctx.request.body;
  ctx.body = await UserEntity.updateUserInfo(id, params);
  ctx.status = 200;
}

async function updatePassword(ctx) {
  const { id } = ctx.params;
  const params = ctx.request.body;
  ctx.body = await UserEntity.updateUserPassword(id, params);
  ctx.status = 200;
}

async function deleteUser(ctx) {
  const { id } = ctx.params;
  ctx.body = await UserEntity.deleteUser(id);
  ctx.status = 200;
}

module.exports = router;
