const Router = require('koa-router');
const passport = require('koa-passport');
const User = require('../../../entities/users/index');
const jwtValidate = require('../../../middleware/jwt/jwtValidation');
const { validate } = require('../../validation');
const {
  updateUserInfoSchema,
  updatePasswordSchema,
  checkingMailSchema,
} = require('./validationSchemes');

const router = new Router({
  prefix: '/users',
});

router
  .get('/:id', passport.authenticate('jwt', { session: false }), jwtValidate, getProfile)
  .put(
    '/info',
    passport.authenticate('jwt', { session: false }),
    jwtValidate,
    validate(updateUserInfoSchema),
    putProfile,
  )
  .put(
    '/:id/password',
    passport.authenticate('jwt', { session: false }),
    jwtValidate,
    validate(updatePasswordSchema),
    updatePassword,
  )
  .delete(
    '/delete',
    passport.authenticate('jwt', { session: false }),
    jwtValidate,
    validate(checkingMailSchema),
    deleteProfile,
  );

async function getProfile(ctx) {
  const { id } = ctx.params;
  ctx.body = await User.getUserById(id);
  ctx.status = 200;
}

async function putProfile(ctx) {
  const params = ctx.request.body;
  ctx.body = await User.updateUser(params);
  ctx.status = 200;
}

async function updatePassword(ctx) {
  const params = ctx.request.body;
  ctx.body = await User.updatePassword(params);
  ctx.status = 200;
}

async function deleteProfile(ctx) {
  const params = ctx.request.body;
  ctx.body = await User.deleteUser(params);
  ctx.status = 200;
}

module.exports = router;
