const Router = require('koa-router');
const User = require('../../../entities/users/index');
const Auth = require('../../../entities/auth/index');
const { validate } = require('../../validation');
const { registerSchema, loginSchema, checkingMailSchema } = require('./validationSchemes');

const router = new Router({
  prefix: '/auth',
});

router
  .post('/registration', validate(registerSchema), registration)
  .post('/login', validate(loginSchema), login)
  .post('/recovery', validate(checkingMailSchema), recovery)
  .post('/activate', activate);

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

async function activate(ctx) {
  const { query } = ctx.request;
  ctx.body = await Auth.activateUser(query);
  ctx.status = 200;
}

module.exports = router;
