const Router = require('koa-router');
const passport = require('koa-passport');
const User = require('../../../entities/users/index');
const Auth = require('../../../entities/auth/index');
const {
  validate,
  updateUserInfoSchema,
  registerSchema,
  updatePasswordSchema,
  deleteUserSchema,
} = require('./validation');

const router = new Router({
  prefix: '/users',
});

router
  .get('/:id', getProfile)
  .post('/registration', validate(registerSchema), registration)
  .post('/login', login)
  .post('/recovery', recovery)
  .put(
    '/updateUserInfo',
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
  .put('/passwordRecovery/:email/:token', passwordRecovery)
  .delete(
    '/deleteUser',
    passport.authenticate('jwt', { session: false }),
    validate(deleteUserSchema),
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

async function registration(ctx) {
  const params = ctx.request.body;
  ctx.body = await Auth.registerUser(params);
  ctx.status = 201;
}

async function login(ctx) {
  const params = ctx.request.body;
  ctx.body = await Auth.loginUser(params);
  ctx.status = 200;
}

async function recovery(ctx) {
  const params = ctx.request.body;
  ctx.body = await User.recoverPassword(params);
  ctx.status = 200;
}

async function passwordRecovery(ctx) {
  const query = ctx.params;
  const params = ctx.request.body;
  ctx.body = await User.addNewPassword(params, query);
  ctx.status = 200;
}

module.exports = router;
