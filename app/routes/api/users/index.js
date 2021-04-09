const Router = require('koa-router');
const passport = require('koa-passport');
const UserEntity = require('../../../entities/users/index');
const { validate } = require('../../validation');
const { updateUserInfoSchema, updatePasswordSchema } = require('./validationSchemes');

const router = new Router({
  prefix: '/users',
});

router
  .get('/:id', passport.authenticate('jwt', { session: false }), getUser)
  .put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    validate(updateUserInfoSchema),
    updateUser,
  )
  .put(
    '/:id/password',
    passport.authenticate('jwt', { session: false }),
    validate(updatePasswordSchema),
    updatePassword,
  )
  .delete('/:id', passport.authenticate('jwt', { session: false }), deleteUser);

async function getUser(ctx) {
  const { id } = ctx.params;
  ctx.body = await UserEntity.getUser(id);
  ctx.status = 200;
}

async function updateUser(ctx) {
  const { id } = ctx.params;
  const params = ctx.request.body;
  await UserEntity.updateUserInfo(id, params);
  ctx.status = 200;
}

async function updatePassword(ctx) {
  const { id } = ctx.params;
  const params = ctx.request.body;
  await UserEntity.updateUserPassword(id, params);
  ctx.status = 200;
}

async function deleteUser(ctx) {
  const { id } = ctx.params;
  await UserEntity.deleteUser(id);
  ctx.status = 200;
}

module.exports = router;
