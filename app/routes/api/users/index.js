const Router = require('koa-router');
const passport = require('koa-passport');
const User = require('../../../entities/users/index');
const Auth = require('../../../entities/auth/index');
const { validate, updateSchema, registerSchema } = require('./validation');

const router = new Router({
  prefix: '/users',
});

router
  .get('/:id', getProfile)
  .post('/register', validate(registerSchema), register)
  .post('/login', login)
  .put('/:id', passport.authenticate('jwt', { session: false }), validate(updateSchema), putProfile)
  .delete('/:id', passport.authenticate('jwt', { session: false }), deleteProfile);

async function getProfile(ctx) {
  const { id } = ctx.params;
  ctx.body = await User.getUserById(id);
  ctx.status = 200;
}

async function putProfile(ctx) {
  const { id } = ctx.params;
  const params = ctx.request.body;
  ctx.body = await User.updateUserById(id, params);
  ctx.status = 200;
}

async function deleteProfile(ctx) {
  ctx.body = await User.deleteUserById(ctx.params.id);
  ctx.status = 200;
}

async function register(ctx) {
  const params = ctx.request.body;
  ctx.body = await Auth.registerUser(params);
  ctx.status = 201;
}

async function login(ctx) {
  const params = ctx.request.body;
  const token = await Auth.loginUser(params);
  ctx.set('Authorization', `Bearer ${token}`);
  ctx.body = { token: `Bearer ${token}` };
  ctx.status = 200;
}

module.exports = router;
