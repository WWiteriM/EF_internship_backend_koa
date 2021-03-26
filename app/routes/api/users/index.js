const Router = require('koa-router');
const passport = require('koa-passport');
const mailer = require('../../../services/email');
const User = require('../../../entities/users/index');
const Auth = require('../../../entities/auth/index');
const { validate, updateSchema, registerSchema, mailSchema } = require('./validation');

const router = new Router({
  prefix: '/users',
});

router
  .get('/:id', getProfile)
  .post('/register', validate(registerSchema), register)
  .post('/login', login)
  .post('/send', validate(mailSchema), sendMail)
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
  await mailer(params);
  ctx.status = 201;
}

async function login(ctx) {
  const params = ctx.request.body;
  ctx.body = await Auth.loginUser(params);
  ctx.status = 200;
}

async function sendMail(ctx) {
  const params = ctx.request.body;
  const user = await User.findUserByMail(params);
  await mailer(user);
  ctx.status = 200;
}

module.exports = router;
