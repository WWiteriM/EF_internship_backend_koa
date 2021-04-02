const Router = require('koa-router');
const passport = require('koa-passport');
const User = require('../../../entities/users/index');
const { validate } = require('../../validation');
const {
  updateUserInfoSchema,
  updatePasswordSchema,
  passwordRecoverySchema,
  checkingMailSchema,
} = require('./validationSchemes');

const router = new Router({
  prefix: '/users',
});

router
  .get('/:id', passport.authenticate('jwt', { session: false }), getProfile)
  .put(
    '/updateInfo',
    passport.authenticate('jwt', { session: false }),
    validate(updateUserInfoSchema),
    putProfile,
  )
  .put(
    '/updatePassword',
    passport.authenticate('jwt', { session: false }),
    validate(updatePasswordSchema),
    updatePassword,
  )
  .put('/resetPassword/:email/:token', validate(passwordRecoverySchema), passwordRecovery)
  .delete(
    '/user',
    passport.authenticate('jwt', { session: false }),
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

async function passwordRecovery(ctx) {
  const query = ctx.params;
  const params = ctx.request.body;
  ctx.body = await User.addNewPassword(params, query);
  ctx.status = 200;
}

module.exports = router;
