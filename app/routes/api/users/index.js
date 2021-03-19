const Router = require('koa-router');
const User = require('../../../entities/users/index');
const { validate, updateSchema, registerSchema } = require('./validation');

const router = new Router({
  prefix: '/users',
});

router
  .get('/:id', getProfile)
  .post('/', validate(registerSchema), postProfile)
  .put('/:id', validate(updateSchema), putProfile)
  .delete('/:id', deleteProfile);

async function getProfile(ctx) {
  const { id } = ctx.params;
  ctx.body = await User.getUserById(id);
  ctx.status = 200;
}

async function postProfile(ctx) {
  const params = ctx.request.body;
  ctx.body = await User.addUser(params);
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

module.exports = router;
