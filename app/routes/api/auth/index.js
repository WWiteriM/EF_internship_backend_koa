const Router = require('koa-router');
const AuthEntity = require('../../../entities/auth/index');
const { validate } = require('../../validation');
const {
  registerSchema,
  loginSchema,
  recoverUserPasswordSchema,
  newPasswordSchema,
} = require('./validationSchemes');

const router = new Router({
  prefix: '/auth',
});

router
  .post('/registration', validate(registerSchema), registration)
  .post('/login', validate(loginSchema), login)
  .post('/activate', activate)
  .post('/recovery', validate(recoverUserPasswordSchema), recovery)
  .put('/new-password', validate(newPasswordSchema), newPassword);

async function registration(ctx) {
  const params = ctx.request.body;
  await AuthEntity.registrationUser(params);
  ctx.status = 201;
}

async function login(ctx) {
  const params = ctx.request.body;
  ctx.body = await AuthEntity.loginUser(params);
  ctx.status = 200;
}

async function activate(ctx) {
  const { query } = ctx.request;
  await AuthEntity.activateUser(query);
  ctx.status = 200;
}

async function recovery(ctx) {
  const params = ctx.request.body;
  await AuthEntity.recoverUserPassword(params);
  ctx.status = 200;
}

async function newPassword(ctx) {
  const { query } = ctx.request;
  const params = ctx.request.body;
  await AuthEntity.enterNewUserPassword(params, query);
  ctx.status = 200;
}

module.exports = router;
