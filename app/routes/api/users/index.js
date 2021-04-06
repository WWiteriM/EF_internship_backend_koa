const Router = require('koa-router');
const passport = require('koa-passport');
const User = require('../../../entities/users/index');
const jwtValidate = require('../../../middleware/jwt/jwtValidation');
const { validate } = require('../../validation');
const { updateUserInfoSchema, updatePasswordSchema } = require('./validationSchemes');

const router = new Router({
  prefix: '/users',
});

router
  .get('/:id', passport.authenticate('jwt', { session: false }), jwtValidate, getUser)
  .put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    jwtValidate,
    validate(updateUserInfoSchema),
    updateUser,
  )
  .put(
    '/:id/password',
    passport.authenticate('jwt', { session: false }),
    jwtValidate,
    validate(updatePasswordSchema),
    updatePassword,
  )
  .delete('/:id', passport.authenticate('jwt', { session: false }), jwtValidate, deleteUser);

async function getUser(ctx) {
  const { id } = ctx.params;
  ctx.body = await User.getUser(id);
  ctx.status = 200;
}

async function updateUser(ctx) {
  const { id } = ctx.params;
  const params = ctx.request.body;
  ctx.body = await User.updateUserInfo(id, params);
  ctx.status = 200;
}

async function updatePassword(ctx) {
  const { id } = ctx.params;
  const params = ctx.request.body;
  ctx.body = await User.updateUserPassword(id, params);
  ctx.status = 200;
}

async function deleteUser(ctx) {
  const { id } = ctx.params;
  ctx.body = await User.deleteUser(id);
  ctx.status = 200;
}

module.exports = router;
