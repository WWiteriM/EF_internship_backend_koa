const Router = require('koa-router');
const AuthEntity = require('../../../entities/auth/index');
const { bodyValidate, paramsValidate } = require('../../validation');
const {
  registerBodySchema,
  loginBodySchema,
  recoverUserPasswordBodySchema,
  newPasswordBodySchema,
  newPasswordParamsSchema,
  activateParamsSchema,
} = require('./validationSchemes');

const router = new Router({
  prefix: '/auth',
});

router
  .post('/registration', bodyValidate(registerBodySchema), registration)
  .post('/login', bodyValidate(loginBodySchema), login)
  .post('/activate', paramsValidate(activateParamsSchema), activate)
  .post('/recovery', bodyValidate(recoverUserPasswordBodySchema), recovery)
  .put(
    '/new-password',
    bodyValidate(newPasswordBodySchema),
    paramsValidate(newPasswordParamsSchema),
    newPassword,
  );

async function registration(ctx) {
  const params = ctx.request.body;
  ctx.body = await AuthEntity.registrationUser(params);
  ctx.status = 201;
}

async function login(ctx) {
  const params = ctx.request.body;
  ctx.body = await AuthEntity.loginUser(params);
  ctx.status = 200;
}

async function activate(ctx) {
  const { query } = ctx.request;
  ctx.body = await AuthEntity.activateUser(query);
  ctx.status = 200;
}

async function recovery(ctx) {
  const params = ctx.request.body;
  ctx.body = await AuthEntity.recoverUserPassword(params);
  ctx.status = 200;
}

async function newPassword(ctx) {
  const { query } = ctx.request;
  const params = ctx.request.body;
  ctx.body = await AuthEntity.enterNewUserPassword(params, query);
  ctx.status = 200;
}

module.exports = router;
